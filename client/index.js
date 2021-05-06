const express = require("express");
const app = express ();
// const HTTP_PORT = 8080;
const HTTP_PORT = process.argv[3];
const http = require ("http").createServer();
const Map = require('./src/test_js/map');
const Lista = require('./src/test_js/lista');
const Container = require('./src/test_js/container');
const Listamosse = require('./src/test_js/listamosse');
const POIlist = require('./src/test_js/poiList');
const net = require('net');
const SERVER_PORT = 1723,
        MANUAL_DRIVING_SPEED = 2000;

//angular
const io = require("socket.io")(http, {
    cors: {
    //   origin: "http://localhost:4200",
      origin: `http://localhost:${process.argv[2]}`,
        // origin: `${process.argv[2]}`,
        methods: ["GET", "POST"]
    }
});

let map = new Map();
let mosse = new Listamosse();
let lista = new Lista(); //delle task
let poi = new POIlist(); //tutti i POI nella mappa

//da modificare x, y, dir
// let x = 0, y = 0, dir = 0;
let x = process.argv[4], y = process.argv[5], dir = 2;
let stopped = false;
let canCheckAuto = false;
let requestButton = false;

let manualDriving = false;
let manualStop = true; //false si muove
let manualDrivingList = new Listamosse();

/*
dir:
0 = su
1 = destra
2 = giu`
3 = sinistra
*/



let c = new Container();

  //-----------------------------CLIENT---------------------------------

var client = net.connect(SERVER_PORT, 'localhost', ()=>{
    console.log('connected to server');
    client.write(`FORKLIFT\n${process.argv[6]}\n${process.argv[7]}\nLIST;`);
    client.setNoDelay();
});
client.setEncoding('utf8');
client.on('error', ()=>{
    console.log("Something went wrong with the server. Quitting.");
})

client.on('data', (data)=>{
    data = data.toString().replace(/(\r\n|\n|\r)/gm, "");
    let msg=data.toString().split(";");
    let sendPosition=false;
    for (let i = 0; i < msg.length; i++) {
        let cmd = msg[i].split(",");
        switch(cmd[0]){
            case "ALIVE": 
                sendPosition=true;
                
                break;
            case "MAP":
                map.createMap(parseInt(cmd[1]), parseInt(cmd[2]), cmd[3]);
                break;
            case "POI":
                for (let k = 2; k < parseInt(cmd[1])*5+2; k+=5) {
                    poi.addPOI(cmd[k], cmd[k+1], cmd[k+2], cmd[k+3], cmd[k+4]);
                }
                
                io.emit("poilistmap", poi.getListMap());
                break;
            case "PATH":
                
                canCheckAuto = true;
                mosse.deleteAllMoves();
                for (let k = 1; k < cmd.length; k++) {
                    mosse.addMove(cmd[k]);
                    console.log("MOSSAAAAH "+k+": "+cmd[k]);
                }
                break;
            case "STOP":
                if (cmd[1] == '0') {
                    stopped = true;
                } else {
                    for (let k = 0; k < parseInt(cmd[1]); k++) {
                        mosse.addMoveTail('S');
                    }
                }
                console.log(mosse);
                break;
            case "START":
                stopped = false;
                break;
                case "LIST": 
                
                    for (let z = 1; z < cmd.length; z++) {
                        lista.addPOI(cmd[z]);
                    }
                    
                    listNameFromIdList();
                    let tempVar = lista.getFirstPOI();
                    io.emit("updatePOI", (tempVar === 'undefined'? "" : tempVar));
                    break;     
            default: 
                console.log("Unrecognized message from server");
        }
    }
    //muovere il muletto in automatic driving
    if (sendPosition && !manualDriving && !stopped) {
        changePosition(mosse.getLastInsertMove());
    }
    //task completata
    console.log("------------------------");
    console.log(y+","+x);
    console.log(poi.getPosfromId(lista.getFirstPOI()));
    console.log("------------------------");
    if ((x+","+y) == poi.getPosfromId(lista.getFirstPOI())){
        io.emit("completedtaskbutton"); //scambiato x e y
    }
    if(sendPosition){
        if(manualDriving){
            c.aggiungiComando("PATH,0");
            // mosse.deleteAllMoves();
        }
        let toSend=c.getDatiESvuota("POS," + x + "," + y + "," + dir)
        console.log("sending (POS): "+toSend);
        client.write(toSend); 
        client.write('\n');
    }
    /* else{
        let toSend=c.getDatiESvuotaNoParams()
        console.log("sending: "+toSend);
        client.write(toSend); 
        client.write('\n');
    } */
    
});



//-----------------------------ANGULAR---------------------------------
 
client.on('end', ()=>{ 
    console.log('disconnected from server');
});

client.on('close', ()=>{
    console.log('Socket is fully closed now.');
})

function listNameFromIdList() {
    let tmpStr = "";
    let tmpLista = lista.getLista();
    for (let z = 0; z < tmpLista.length; z++) {
        tmpStr += poi.getNameFromId(tmpLista[z]);
        if ((tmpLista.length-z) > 1) {
            tmpStr += ",";
        }
    }
    io.emit("lista", tmpStr);
}

function sendSth(){
    prompt.get(['first', 'last'], (err, res)=>{
        if (err) { return onErr(err); }
        client.write(res.first+" "+res.last+'\n');
    });    
}

function onErr(err) {
    console.log(err);
    return 1;
}


io.on("connection", (socket) => {
    
    //console.log("mostra il pulsante");
    // socket.emit("mappa", map.getMap());
    listNameFromIdList();
    let tempVar = lista.getFirstPOI();
    io.emit("updatePOI", (tempVar === 'undefined'? "" : tempVar));
    
    
    socket.on("updateposition", (data) => {
        let pos = data.toString().split(",");
        x = pos[0];
        y = pos[1];
        dir=({
            N: 0,
            E: 1,
            S: 2,
            O: 3,
        }) [pos[2]];
        console.log(dir);
    });
    
    socket.on("mappa", () => {
        socket.emit("mappa", map.getMap());
    });
    socket.on("requestPOI", () => {
        socket.emit("poilistmap", poi.getListMap());
    });
    socket.on("start", () => { 
        c.aggiungiComando("PATH,0"); //PATH -> taskfinite -> gestito da server | 0 false -> richiede lo stesso percorso
        //c.aggiungiComando("MAP");
    });
    socket.on("alert-notification", () => {
        c.aggiungiComando("ECC");
    }) 
    
    //---guida manuale--
   socket.on("movement", (manualMove) => { // pressione tasti provenienti dalla guida manuale
        manualDrivingList.addMove(manualMove.toString().replace(/(\r\n|\n|\r)/gm, ""));
   });
    socket.on("manualStart", () => {
        manualStop = false;
    });
    socket.on("manualStop", () => {
        manualStop = true;
    });
    socket.on("automatica", () => {
        manualDriving = false;
        manualDrivingList.deleteAllMoves();
        mosse.deleteAllMoves();
        c.aggiungiComando("PATH,0"); //0 false -> richiede lo stesso percorso
    });
    socket.on("manuale", () => {
        manualDriving = true;
        manualStop = true;
    });
    
    //task
    socket.on("taskcompletata", () => {
        lista.removeFirstPOI();
        listNameFromIdList();
        let tempVar = lista.getFirstPOI();
        io.emit("updatePOI", (tempVar === 'undefined'? "" : tempVar));
        c.aggiungiComando("PATH,1"); //1 true -> rimuovi anche la task
        if (lista.isEmpty()) {
            c.aggiungiComando("LIST");
        }
        //c.aggiungiComando("MAP"); 

    });


});

http.listen(HTTP_PORT, () => {
    console.log("server is listening" + HTTP_PORT);
})

function changePosition(mossa){
    console.log("Devo muovermi: "+mossa);
    switch(mossa) {
      case "2": // turn right
        if      (dir == 0) dir = 1;
        else if (dir == 3) dir = 0;
        else if (dir == 2) dir = 3;
        else if (dir == 1) dir = 2;
        

        break;
        case "3": // turn left
          if      (dir == 0) dir = 3;
          else if (dir == 3) dir = 2;
          else if (dir == 2) dir = 1;
          else if (dir == 1) dir = 0;
          
          break;
        case "1": //turnaround
          if      (dir == 0) dir = 2;
          else if (dir == 3) dir = 1;
          else if (dir == 2) dir = 0;
          else if (dir == 1) dir = 3;
          
          break;
        case "4": //stop
          //fermo non fa niente
          break;
        case "0": // go straight
          //scambiato x e y
          let movVertic = x; 
          let movOrizz = y;
          if        (dir == 0) {
            movVertic--;
          } else if (dir == 2) {
            movVertic++;
          } else if (dir == 1) {
            movOrizz++;
          } else if (dir == 3) {
            movOrizz--;
          }
          
          if (movOrizz >= 0 && movVertic >= 0 && movOrizz < map.getCol() && movVertic < map.getRow() && (map.getCell(movVertic, movOrizz) != '0')) {
              //scambiato x e y
              x = movVertic;
              y = movOrizz;
          }
          break;
          default:
              mossa ="4"; // stop
    }
    io.emit("updatemap", x+","+y+","+dir);
    io.emit("arrows", mossa);
}

setInterval(() => {
    if (manualDriving) {
        let tempMove = manualDrivingList.getLastInsertMove();
        manualDrivingList.deleteAllMoves();
        if (!manualStop || tempMove == "2" || tempMove == "3" || tempMove == "1") {
            changePosition(tempMove === undefined ? "0" : tempMove);
        } 
        //c.aggiungiComando("PATH,0");
    }
}, MANUAL_DRIVING_SPEED);