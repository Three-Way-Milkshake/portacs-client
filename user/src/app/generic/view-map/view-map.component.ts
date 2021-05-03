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
  tmp : string[][] = [];
  pos : UnitPosition [] = [];
  listPOIID : string[] = [];
  listPOIx : number[] = [];
  listPOIy : number[] = [];
  listPOIt : string[] = [];
  listPOIName : string[] = [];
  constructor(private ngZone: NgZone, private servicePOI: POIListService) {}

  ngOnInit() {
    this.servicePOI.getPOIMap();
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

  setValues(data: string) {
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
    if (this.pos != null) {
      for (let t = 0; t < this.pos.length; t++) {
        this.tmp[this.pos[t].posX][this.pos[t].posY] = (this.pos[t].dir).toString();
      }
    }
    console.log("---1---");
    console.log(this.tmp);
  }
  
  setPOIonMap() {
    for (let i = 0; i < this.listPOIID.length; i++){
      this.tmp[this.listPOIx[i]][this.listPOIy[i]] = this.listPOIName[i];
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

  dirToNumber(d : string) {
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

  changePosition(cmd : string){
    /*
    cmd = cmd.toString().replace(/(\r\n|\n|\r)/gm, "");
    let data : string[] = cmd.toString().split(",");
    for (let j = 0, i = 0; i < data.length; i= i+3, j++) {
      this.pos[j] = {posX: parseInt(data[i]), posY: parseInt(data[i+1]), dir: this.dirToNumber(data[i+2])};
    }
    socket.emit("getmap");
    */
   
    cmd = cmd.toString().replace(/(\r\n|\n|\r)/gm, "");
    let data : string[] = cmd.toString().split(";");//una unità
    let unitTemp : string[];
    for (let k = 1; k < parseInt(data[0])+1; k++) {
      unitTemp = data[k].split(',');
      this.pos[k-1] = {posX: parseInt(unitTemp[1]), posY: parseInt(unitTemp[2]), dir: this.dirToNumber(unitTemp[3])};
    }
    
    socket.emit("getmap");
  }

}
