const express = require("express");
const app = express ();
const HTTP_PORT = 8090;
const http = require ("http").createServer();
const Map = require('./js/map');
const UserInformation = require('./js/user-information');
const POIlist = require('./js/POIlist')
const net = require('net');
const ListsTask = require('./js/listsTask')
const ListManager = require('./js/listManager.js');
const UnitsList = require('./js/unitsList');
const CommandsToJava = require('./js/commandsToJava.js');
const { createJsxText, addSyntheticLeadingComment } = require("typescript");
const { ScopeAwareRuleWalker } = require("tslint");
const SERVER_PORT = 1723;

const io = require("socket.io")(http, {
    cors: {
      origin: `http://localhost:${process.argv[2]}`,
      methods: ["GET", "POST"]
    }
});

let ctj = new CommandsToJava();
let listManager = new ListManager();
let unitsL = new UnitsList(); //lista muletti
let tmpName = "";
let tmpSurname = "";
let tmpIDUser = "";
let user = new UserInformation();
let map = new Map();
// let oldMap=new Map();
let poil = new POIlist();
let l = new ListsTask();
/*
dir:
0 = su
1 = destra
2 = giu`
3 = sinistra
*/
  //-----------------------------CLIENT---------------------------------
var client;
function createConnectionServer(id, password) {
    console.log("\n\n\nNUOVA CONNESSIONE AL SERVER\n\n\n");
    user.setPassword(password);
    var failClient = false;
    ctj.getDatiESvuota();
    client = net.connect(SERVER_PORT, process.env.SERVER_ADDR, ()=>{
        console.log('connected to server');
        client.write("USER\n"+id+"\n"+password+"\n");
        user.setId(id);
        client.setNoDelay();
    });

    client.setEncoding('utf8');
    client.on('error', ()=>{
        console.log("Something went wrong with the server. Quitting.");
    });

    client.on('end', ()=>{ 
        console.log('disconnected from server');
    });

    client.on('close', ()=>{
        console.log('Socket is fully closed now.');
    });

    client.on('data', (data)=>{
        data = data.toString().replace(/(\r\n|\n|\r)/gm, "");
        let msg=data.toString().split(";");
        for (let i = 0; i < msg.length; i++) {
            let cmd = msg[i].split(",");
            if (cmd[0] == "") {
                continue; // fix
            }
            switch(cmd[0]){
                case "OK":
                    io.emit("logincorrect", cmd[1]);
                    user.setInfo(cmd[2], cmd[3]);
                    break;
                case "FAIL":
                    io.emit("loginerror", cmd[1]);
                    failClient = true;
                    break;
                case "ECC":
                    io.emit('ecc', cmd[1]);
                    break;
                case "MAP":
                    //se cmd[1]=OK ho cambiato la mappa
                    //se cmd[1]=fail errore cambio mappa
                    //else la richiedo per la view map
                    if (cmd[1] == "OK") {
                        // ctj.aggiungiComando("POI")
                    } else if (cmd[1] == "FAIL") {
                        // ctj.aggiungiComando("MAP");
                        // map.setMap(oldMap.getMapDeepCopy());
                        // io.emit("managemap", map.getMap());
                        // io.emit("map", map.getMap());
                        io.emit('ecc', cmd[2]);
                    } else {
                        map.createMap(parseInt(cmd[1]), parseInt(cmd[2]), cmd[3]);
                        
                        io.emit("map", map.getMap());
                        io.emit("managemap", map.getMap());
                    }
                    break;
                case "POI":
                    poil.delete();
                    for (let k = 2; k < parseInt(cmd[1]*5+2); k+=5) {
                        poil.addPOI(cmd[k], cmd[k+1], cmd[k+2], cmd[k+3], cmd[k+4]);
                    }
                    
                    io.emit("poilist", poil.getListString());
                    io.emit("poilistmap", poil.getListMap());
                    io.emit("poilistmanagemap", poil.getListMap());
                    break;
                case "UNI":
                    let strUnit = cmd[1];
                    for (let k = 2; k < parseInt(cmd[1]*4+2); k+=4) {
                        strUnit += ";" + cmd[k] + "," + cmd[k+1] +  "," + cmd[k+2] + "," + cmd[k+3];
                    }
                    io.emit("unit", strUnit);
                    break;
                case "ADU":
                    io.emit("responseregistration", cmd[1]+","+cmd[2]);
                    addTempManager(cmd[1]);
                    break;
                //rimozione un account
                case "RMU":
                    if(cmd[1] == "OK"){
                        io.emit("responseeliminationU", cmd[1]);
                        listManager.removeOne(tmpIDUser);
                    }  else {
                        io.emit("responseeliminationU", cmd[1]+","+ cmd[2]);
                    }
                    tmpIDUser = "";
                    break;
                case "EDU":
                    if(cmd[1] == "OK"){
                        if (cmd[2] != null) {
                            //c'è la password
                            io.emit("responseresetpwdmanager", cmd[2]);
                        } else {
                            io.emit("responseeditmanager", cmd[1]);
                            ctj.aggiungiComando("LISTU");
                        }
                    }  else {
                        //c'è errore
                        io.emit("responseeditmanager", cmd[1], "," + cmd[2]);
                    }
                    break;
                case "LISTU":
                    listManager.delete();
                    for (let k = 2; k < parseInt(cmd[1])*4+2; k+=4) {
                        if(cmd[k]!=user.id){
                            listManager.add(cmd[k]+","+cmd[k+1]+","+cmd[k+2]); // manca ruolo
                        }
                    }
                    io.emit("viewlistmanager", listManager.getListManager());
                    break;
                case "LISTF":
                    unitsL.delete();
                    for (let k=2; k < parseInt(cmd[1])*2+2; k+=2){
                        unitsL.add(cmd[k],cmd[k+1])
                    }
                    io.emit("viewlistunit", unitsL.getListUnit());
                    break;
                //CONTROLLARE SE CORRETTO
                case "ADL":
                    io.emit("responsenewlist", cmd[1]+","+ cmd[2]);
                    if(cmd[1] == "OK") {
                        l.addListnotAss(cmd[2]);
                    } 
                    break;
                case "RML":
                    io.emit("responsedeletelist", cmd[1]+","+ cmd[2]);
                    if(cmd[1] == "OK") {
                        l.removeList(cmd[2]);
                    } 
                    break;
                case "LIST":
                    //console.log("\n\n\n\n\nPRIMA: "+l.getNotAss());
                    io.emit("listnotAss", l.getNotAss());
                    l.remove();
                    let k = 2;
                    for (let g = 0; g < parseInt(cmd[1]); g++) {
                        let strTask = cmd[k];
                        for (let m = 0; m < parseInt(cmd[k+1]); m++) {
                            strTask += "," + cmd[m+k+2];
                        }
                        l.removeListNotAss(strTask);
                        k += parseInt(cmd[k+1])+2;
                        l.addListAss(strTask);
                    }
                    io.emit("listnotAss", l.getNotAss());
                    //console.log("DOPO: "+l.getNotAss());
                    let nameList = poil.turnIdToName(l.getAss());
                    io.emit("listAss", nameList);
                    io.emit("listtable", nameList);
                    break;
                case "ADF":
                    io.emit("responsenewunit", cmd[1]+","+ cmd[2]);
                    if(cmd[1] == "OK") {
                        ctj.aggiungiComando("LISTF");
                    } 
                break;
                //risposta unità rimossa
                case "RMF":
            
                    if(cmd[1] == "OK") {
                        ctj.aggiungiComando("LISTF");
                        io.emit("responsedeleteunit", cmd[1]);
                    } else {
                        io.emit("responsedeleteunit", cmd[1]+","+ cmd[2]);
                    }
                break;
                default:
                    console.log("Unrecognized message from server: " + cmd[0]);
            }
        }
        if (!failClient) {
            client.write(ctj.getDatiESvuota());
            client.write('\n', ()=>{
                //console.log("response sent");
            });
        } else {
            client.destroy();
        }
    });    
}

function onErr(err) {
    console.log(err);
    return 1;
}

//-----------------------------ANGULAR---------------------------------

io.on("connection", (socket) => {

    socket.on("newuserinformation", (data) => {
        let userInfo = data.toString().split(',');
        user.setInfo(userInfo[0], userInfo[1], userInfo[2]);
        ctj.aggiungiComando("EDIT,NAME,"+userInfo[0]);
        ctj.aggiungiComando("EDIT,LAST,"+userInfo[1]);
        ctj.aggiungiComando("EDIT,PWD,"+userInfo[2]);
        socket.emit("userinformation", user.getInformation());
    });
    socket.on("getlistmanager", () => {
        ctj.aggiungiComando("LISTU");
    });
    //new account
    socket.on("registration", (data) => {
        let tmpStr = data.split(',');
        tmpName = tmpStr[0];
        tmpSurname = tmpStr[1];
        ctj.aggiungiComando("ADU,MANAGER,"+data);
    });
    //delete account
    socket.on("removemanager", (data) => {
        
        //listManager.removeOne(data);
        ctj.aggiungiComando("RMU,"+data);
        tmpIDUser = data;
    })
    
    socket.on("getinfoaccount", () => {
        socket.emit("userinformation", user.getInformation());
    });
    socket.on("getlistunit", () => {
        ctj.aggiungiComando("LISTF");
    });
    socket.on("modifymanager", (data) => {
        let tmpData = data.split(',');
        ctj.aggiungiComando("EDU," + tmpData[0] + ",NAME," + tmpData[1]);
        ctj.aggiungiComando("EDU," + tmpData[0] + ",LAST," + tmpData[2]);
    });
    socket.on("resetmanager", (data) => {
        ctj.aggiungiComando("EDU," + data + ",RESET");
    });
    socket.on("newunit", (data) => {        
        ctj.aggiungiComando("ADF,"+data);
    });
    socket.on("deleteunit", (data) => {
        let tmp = data.split(',');
        ctj.aggiungiComando("RMF,"+tmp[0]);
        
    });
    socket.on("getmap", () => {
        socket.emit("map", map.getMap());
    });
    socket.on("getmanagemap", () => {
        socket.emit("managemap", map.getMap());
    });
    socket.on("getpoilist", () => {
        socket.emit("poilist", poil.getListString());
    });
    socket.on("getpoilistmap", () => {
        socket.emit("poilistmap", poil.getListMap());
    });
    socket.on("getpoilistmanagemap", () => {
        socket.emit("poilistmanagemap", poil.getListMap());
    });
    socket.on("changedmap", (data) => {
        console.log("------\nMAPPA CAMBIATA");
        //oldMap=JSON.parse(JSON.stringify(map));
        // oldMap.setMap(map.getMapDeepCopy());
        map.setMap(data);
        let poisWellMapped=map.getPoisWellMapped();
        for(let p in poisWellMapped){
            if(!poil.contains(p)){
                let content=poisWellMapped[p]
                //to complete, sending always 0 -> LOAD type
                console.log("THIS IS UNKOWN: "+content);
                poil.addPOI(content.x, content.y, 0, 0, p)
            }
        }
        console.log(map.getMapForServer());
        ctj.aggiungiComando("MAP,"+map.getR()+","+map.getC()+","+map.getMapForServer());
        let pois=poil.getListForCell();
        
        /* for(let i=0; i<pois.length; ++i){
            
            //ctj.aggiungiComando('CELL,'+pois[i])
        } */
    });
    socket.on("newcell", (cell) => {
        ctj.aggiungiComando("CELL,"+cell);

    });
    socket.on("newpoi", (poi) => {
        ctj.aggiungiComando("CELL,"+poi);
    });
    socket.on("getlistAss", () => {
        socket.emit("listAss", poil.turnIdToName(l.getAss()));
    });
    socket.on("getlistNotAss", () => {
        socket.emit("listnotAss", l.getNotAss());
        
    });
    socket.on("newlisttask", (data) =>{
        //[ '0,1,p1', '0,5,p5', '0,9,p9' ]
        let toSend='';
        for(let i=0; i<data.length; ++i){
            toSend+=data[i].split(',')[1];
            if(i<data.length-1){
                toSend+=',';
            }
        }
        // let slicer=data.slice(',');
        // for(let i=1; i<slicer.length; i+=3){
        //     toSend+=slicer[i];
        // }
        // ctj.aggiungiComando("ADL,"+data);
        ctj.aggiungiComando("ADL,"+toSend+';');
        l.addTemporaryList(data);
    });
    socket.on("removeList", (data) =>{
        ctj.aggiungiComando("RML,"+data);
        l.removeList(data);
        socket.emit("listnotAss", l.getNotAss());
    });
    socket.on("login", (data) =>{
        let tmpData = data.split(',');
        map = new Map();
        poil = new POIlist();
        l = new ListsTask();
        //provaaa
        //socket.emit("logincorrect", "MANAGER");
        createConnectionServer(tmpData[0], tmpData[1]);
    });
    socket.on("logout", () =>{
        ctj.aggiungiComando("LOGOUT");
    });
});

function addTempManager(idManager) {
    listManager.add(tmpName+","+tmpSurname+","+idManager);
    tmpName = "";
    tmpSurname = "";
}

http.listen(HTTP_PORT, () => {
    console.log("server is listening" + HTTP_PORT);
})