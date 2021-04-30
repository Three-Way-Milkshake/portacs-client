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
let unitsL = new UnitsList();
let tmpName = "";
let tmpSurname = "";
let tmpIDUser = "";
let user = new UserInformation();
let map = new Map();
let poil = new POIlist();
let l = new ListsTask();
let x = [];
let y = [];
let dir = [];
/*
dir:
0 = su
1 = destra
2 = giu`
3 = sinistra
*/
  //-----------------------------CLIENT---------------------------------

var client = net.connect(SERVER_PORT, 'localhost', ()=>{
    console.log('connected to server');
    /*----------------------------- SERVE ANCORA? ------------------------------------ */
    client.write("RESP\n");
    client.setNoDelay();
});
client.setEncoding('utf8');
client.on('error', ()=>{
    console.log("Something went wrong with the server. Quitting.");
})

client.on('data', (data)=>{
    data = data.toString().replace(/(\r\n|\n|\r)/gm, "");
    let msg=data.toString().split(";");
    for (let i = 0; i < msg.length; i++) {
        let cmd = msg[i].split(",");
        console.log(cmd);
        switch(cmd[0]){
            case "MAP":
                map.createMap(cmd[1], cmd[2], cmd[3]);
                io.emit("map", map.getMap());
                break;
            case "POI":
                poil.delete();
                for (let k = 2; k < parseInt(cmd[1]*5+2); k+=5) {
                    poil.addPOI(cmd[k], cmd[k+1], cmd[k+2], cmd[k+3]);
                }
                io.emit("poilist", poil.getListString());
                io.emit("poilistmap", poil.getListMap());
                break;
            case "UNI":
                let mul = "";
                for (let k = 1; k < cmd.length; k++) {
                    mul += cmd[k] + (cmd.length - k <= 1? "" : ",");
                }
                io.emit("unit", mul);
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
            case "EDU":
                if(cmd[1] == "OK"){
                    if (cmd[2] != null) {
                        //c'è la password
                        io.emit("responseresetpwdmanager", cmd[1]);
                    } else {
                        io.emit("responseeditmanager", cmd[1]);
                        ctj.aggiungiComando("LISTU");
                    }
                }  else {
                    //c'è errore
                    io.emit("responseeditmanager", cmd[1], "," + cmd[2]);
                }
            case "LISTU":
                listManager.delete();
                for (let k = 2; k < parseInt(cmd[1])*4+2; k+=4) {
                    listManager.add(cmd[k+1],cmd[k+2],cmd[k]);
                }
                break;
            case "LISTF":
                unitsL.delete();
                for (let k=2; k < parseInt(cmd[1])*2+2; k+=2){
                    unitsL.add(cmd[k],cmd[k+1])
                }
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
                let tmp = cmd[1];
                for (let k=3; k< parseInt(cmd[2])+2; k++) {
                    tmp = tmp + "," +cmd[k];
                }
                addListAss(tmp);
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
    client.write(ctj.getDatiESvuota());
    client.write('\n', ()=>{
        console.log("response sent");
    });
});



//-----------------------------ANGULAR---------------------------------
 
client.on('end', ()=>{ 
    console.log('disconnected from server');
});

client.on('close', ()=>{
    console.log('Socket is fully closed now.');
})

function onErr(err) {
    console.log(err);
    return 1;
}


io.on("connection", (socket) => {

    socket.on("newuserinformation", (data) => {
        let userInfo = data.toString().split(',');
        user.setInfo(userInfo[0], userInfo[1], userInfo[2]);
        socket.emit("userinformation", user.getInformation());
    });
    socket.on("getlistmanager", () => {
        socket.emit("viewlistmanager", listManager.getListManager());
    });
    //new account
    socket.on("registration", (data) => {
        //listManager.add(data);
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
        socket.emit("viewlistunit", unitsL.getListUnit());
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
    socket.on("changedmap", (data) => {
        map.setMap(data);
        //inviare al server
    });
    socket.on("getlistAss", () => {
        socket.emit("listAss", l.getAss());
    });
    socket.on("getlistNotAss", () => {
        socket.emit("listnotAss", l.getNotAss());
        
    });

    socket.on("newlisttask", (data) =>{
        ctj.aggiungiComando("ADL,"+data);
        l.addTemporaryList(data);
    }) 

    socket.on("removeList", (data) =>{
        ctj.aggiungiComando("RML,"+data);
        l.removeList(data);
        socket.emit("listnotAss", l.getNotAss());
    })


});

function addTempManager(idManager) {
    listManager.add(tmpName+","+tmpSurname+","+idManager);
    tmpName = "";
    tmpSurname = "";
}

http.listen(HTTP_PORT, () => {
    console.log("server is listening" + HTTP_PORT);
})