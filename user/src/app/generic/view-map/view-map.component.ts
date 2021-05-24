import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';
import { UnitPosition } from '../../unitposition';
import { POIListService } from '../generic-service/poilist.service';

const socket = io("http://127.0.0.1:8090/");


@Component({
  selector: 'app-viewmap',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.css']
})
export class ViewMapComponent implements OnInit {
  status : string[] =[];
  tmp : string[][] = [];
  pos : UnitPosition [] = [];
  listPOIID : string[] = [];
  listPOIx : number[] = [];
  listPOIy : number[] = [];
  listPOIt : string[] = [];
  listPOIName : string[] = [];
  idName : string[][] = [];
  poiMap : string[][] = [];
  tasklist : string[][] = [];
  constructor(private ngZone: NgZone, private servicePOI: POIListService) {}

  ngOnInit() {
    this.servicePOI.getPOIMap();
    socket.emit("getmap");
    this.onNewAction().subscribe((data) =>{
      this.ngZone.run(() => {
        this.changePosition(String(data));
      }); 
    });
    this.onNewMessage().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));
      });
    });
    this.servicePOI.onPOIMap().subscribe((data : string[]) => {
      this.ngZone.run(() => {
        this.setPOI(data);
      });
    });

    this.onNewList().subscribe((data : string[]) => {
      this.ngZone.run(() => {
        this.setList(data);
      });
    });
  }

  checkStatusBase(x : number, y : number) {
    let tmpStatus = "Ritornando alla base";
    for (let i = 0 ; i < this.listPOIx.length; i++) {
      if (this.listPOIx[i] == x && this.listPOIy[i] == y) {
        if (this.listPOIt[i] == "0" || this.listPOIt[i] == "1") {
          return "In attesa";
        } else if (this.listPOIt[i] == "2") {
          return "Parcheggiato";
        }
      }
    }
    return tmpStatus;
  }

  checkStatusNormal(x : number, y : number) {
    let tmpStatus = "In movimento";
    for (let i = 0 ; i < this.listPOIx.length; i++) {
      if (this.listPOIx[i] == x && this.listPOIy[i] == y) {
        if (this.listPOIt[i] == "0") {
          return "Caricando";
        } else if (this.listPOIt[i] == "1") {
          return "Scaricando";
        } else if (this.listPOIt[i] == "2") {
          return "Parcheggiato";
        }
      }
    }
    return tmpStatus;
  }

  getXUnit(unit : string) {
    for (let i = 0; i < this.pos.length; i++) {
      if (this.pos[i].id == unit) {
        return this.pos[i].posX;
      }
    }
    return -1;
  }
  getYUnit(unit: string){
    for (let i = 0; i < this.pos.length; i++) {
      if (this.pos[i].id == unit) {
        return this.pos[i].posY;
      }
    }
    return -1;
  }
  
  isBase(poi : string) {
    for (let i = 0; i < this.listPOIName.length; i++) {
      if (poi == this.listPOIName[i] && this.listPOIt[i] == "2") {
        return true;
      }
    }
    return false;
  }

  setList(data : string[]){ 
    console.log(data);   
    this.status = [];
    this.tasklist = [];
    for (let i = 0; i < data.length; i++) {
      this.tasklist[i] = [];
      let str = data[i].split(',');
      if ((str.length == 2 && this.isBase(str[1])) || str.length == 1) { // unità senza lista di task
        this.status[i] = this.checkStatusBase(this.getXUnit(str[0]), this.getYUnit(str[0]));
        this.tasklist[i][0] = str[0];
      } else {
        this.status[i] = this.checkStatusNormal(this.getXUnit(str[0]), this.getYUnit(str[0]));
        for (let j = 0; j < str.length; j++) {
          this.tasklist[i][j] = str[j];
        }
      }
    }
  }

  setPOI(data: string[]) {
    for (let i = 0; i < data.length ; i++){
      let dataTmp = data[i].split(",");
      this.listPOIx[i] = parseInt(dataTmp[0]);
      this.listPOIy[i] = parseInt(dataTmp[1]);
      this.listPOIt[i] = dataTmp[2];
      this.listPOIID[i] = dataTmp[3];
      this.listPOIName[i] = dataTmp[4];
    }
    
    
  }

  onNewMessage() {
    return new Observable(observer => {
      socket.on('map', (msg: string) => { 
        observer.next(msg);
      });
    });
  }

  onNewAction(){
    return new Observable(observer => {
      socket.on('unit', (msg: string) => {
        observer.next(msg);
      });
    });
    
  }

  onNewList(){
    return new Observable(observer => {
      socket.on('listtable', (msg: string[]) => {
        observer.next(msg);
      });
    });
    
  }

  setValues(data: string) {
    console.log(data);
    
    this.tmp=[];
    this.tmp[0] = [];
    let k = 0; //virgole
    let j = 0; //parentesi
    let i = 2;
    while (i < data.length) {
      if (data[i] === "[") {
        k = 0;
        j++;
        this.tmp[j] = [];
      } else if (data[i] === ",") {
        k++;
        i++;
      } else if (data[i] === "]") {
      } else {
        this.tmp[j][k] = data[i];
      }
      i++;
    }
    this.setPOIonMap();
    if (this.listPOIx != null) {
      this.setNamePOIOnMap();
    }
    if (this.pos != null) {
      this.setIdOnMap();
      for (let t = 0; t < this.pos.length; t++) {
        this.tmp[this.pos[t].posX][this.pos[t].posY] = (this.pos[t].dir).toString();
      }
    }
  }

  setIdOnMap() {
    this.idName = [];
    for (let t = 0; t < this.pos.length; t++) {
      if (this.idName[this.pos[t].posX] == null) {
        this.idName[this.pos[t].posX] = [];
      }
      if (this.isPOI(this.pos[t].posX, this.pos[t].posY) && this.typePOI(this.pos[t].posX, this.pos[t].posY) == "2") {
        if (this.idName[this.pos[t].posX][this.pos[t].posY] == null) {
          this.idName[this.pos[t].posX][this.pos[t].posY] = "1";
        } else {
          this.idName[this.pos[t].posX][this.pos[t].posY] = String(parseInt(this.idName[this.pos[t].posX][this.pos[t].posY])+1);
        }
      } else {
        this.idName[this.pos[t].posX][this.pos[t].posY] = (this.pos[t].id).toString();
      }
    }
  }

  setNamePOIOnMap() {
    for (let t = 0; t < this.listPOIx.length; t++) {
      if (this.poiMap[this.listPOIx[t]] == null) {
        this.poiMap[this.listPOIx[t]] = [];
      }
      this.poiMap[this.listPOIx[t]][this.listPOIy[t]] = (this.listPOIName[t]).toString();
    }
  }
  
  setPOIonMap() {
    for (let i = 0; i < this.listPOIID.length; i++){
      this.tmp[this.listPOIx[i]][this.listPOIy[i]] = this.typeToMap(this.listPOIt[i]);
    }
  }

  typeToMap(typeCell : string) {
    if (typeCell == "0") {
      return "20";
    } else if (typeCell == "1") {
      return "21";
    } else if (typeCell == "2") {
      return "22";
    } else {
      return "-1";
    }
  }

  getDir(x : number, y : number) {
    for (let t = 0; t < this.pos.length; t++) {
      if (this.pos[t].posX == x && this.pos[t].posY == y) {
        return this.pos[t].dir;
      }
    }
    return -1;
  }

  typePOI(x : number, y : number) {
    for (let i = 0; i < this.listPOIx.length; i++) {
      if (this.listPOIx[i] == x && this.listPOIy[i] == y) {
        return this.listPOIt[i];
      }
    }
    return "-1";
  }

  isPOI(x : number, y : number) {
    for (let i = 0; i < this.listPOIx.length; i++) {
      if (this.listPOIx[i] == x && this.listPOIy[i] == y) {
        return true;
      }
    }
    return false;
  }

  dirToNumber(d : string, x : number, y : number) {
    if (this.isPOI(x, y)) {
      if        (d == "0") {
        return 30 + parseInt(this.typePOI(x, y))*10;
      } else if (d == "1") {
        return 31 + parseInt(this.typePOI(x, y))*10;
      } else if (d == "2") {
        return 32 + parseInt(this.typePOI(x, y))*10;
      } else if (d == "3") {
        return 33 + parseInt(this.typePOI(x, y))*10;
      } else {
        return -1;
      }
    } else {
      if        (d == "0") {
        return 7;
      } else if (d == "1") {
        return 8;
      } else if (d == "2") {
        return 9;
      } else if (d == "3") {
        return 10;
      } else {
        return -1;
      }
    }
  }

  changePosition(cmd : string){
    cmd = cmd.toString().replace(/(\r\n|\n|\r)/gm, "");
    let data : string[] = cmd.toString().split(";");//una unità
    let unitTemp : string[];
    for (let k = 1; k < parseInt(data[0])+1; k++) {
      unitTemp = data[k].split(',');
      this.pos[k-1] = {id: unitTemp[0], posX: parseInt(unitTemp[1]), posY: parseInt(unitTemp[2]), dir: this.dirToNumber(unitTemp[3], parseInt(unitTemp[1]), parseInt(unitTemp[2]))};
    }
    socket.emit("getmap");
  }

}
