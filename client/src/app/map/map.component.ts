import { MapService } from './../services/map.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from './../../environments/environment';
import { UnitPosition } from './../unitposition';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  tmp : string[][] = [];
  pos: UnitPosition;
  nextPOI: string = '';
  xnextPOI!: number;
  ynextPOI!: number;
  listPOIID : string[] = [];
  listPOIx : number[] = [];
  listPOIy : number[] = [];
  listPOIt : string[] = [];
  listPOIName: string[] = [];
  poiMap : string[][] = [];
  constructor(private service: MapService, private ngZone: NgZone) {
    this.pos = {posX: environment.x, posY: environment.y, dir: 2};
   }
  ngOnInit() {
    this.service.requestPOI();
    this.service.requestMap();
    this.service.onNewAction().subscribe((data) => {
      this.ngZone.run(() => {
        this.changePosition(String(data));
      });
    });
    
    this.service.onNewPOIList().subscribe((data) => {
      this.ngZone.run(() => {
        this.savePOI(String(data));
      });
    });
    
    this.service.onNewMap().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));
      });
    });
    this.service.onNewPOI().subscribe((data) => {
      this.ngZone.run(() => {
        console.log(data)
        this.nextPOI = String(data);
      });
    });
  }

  findNextPoi(){
    for (let i = 0; i < this.listPOIID.length; i++){
      if(this.listPOIName[i] === this.nextPOI){
        this.xnextPOI = this.listPOIx[i];
        this.ynextPOI = this.listPOIy[i];     
      } 
    }
  }

  delete() {
    this.listPOIID = [];
    this.listPOIx = [];
    this.listPOIy = [];
    this.listPOIt = [];
    this.listPOIName = [];
  }

  savePOI(data : string) {
    this.delete();
    let tmpStr = data.split(';')
    for (let i = 0; i < tmpStr.length ; i++){
      if (tmpStr[i] != "") {
        let dataTmp = tmpStr[i].split(",");
        this.listPOIx[i] = parseInt(dataTmp[0]);
        this.listPOIy[i] = parseInt(dataTmp[1]);
        this.listPOIt[i] = dataTmp[2];
        this.listPOIID[i] = dataTmp[3];
        this.listPOIName[i] = dataTmp[4];
      }
    }
  }
  
  /*
    transform data in a string
  */
  setValues(data: string) {
    this.tmp = [];
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
    this.findNextPoi();
    this.setPOIonMap();
    if (this.listPOIx != null) {
      this.setNamePOIOnMap();
    }

    //scambiato x e y
    this.tmp[this.pos.posX][this.pos.posY] = this.dirToIntArray(); //metto il muletto nella mappa con la sua direzione
    
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
    for (let i = 0; i < this.listPOIID.length; i++){
      if(this.listPOIName[i] === this.nextPOI){
        this.tmp[this.listPOIx[i]][this.listPOIy[i]] = "11";
      }
      
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

  dirToIntArray() {
    if (this.pos.dir == 0) {        // facing NORD
      return "7";
    } else if (this.pos.dir == 1) { // facing EAST
      return "8";
    } else if (this.pos.dir == 2) { // facing SOUTH
      return "9";
    } else if (this.pos.dir == 3) { // facing WEST
      return "10";
    } else {                        // errore
      return "-";
    }
  }

  changePosition(mossa: string) {
    let pos : string[] = mossa.toString().split(",");
    this.pos.posX = parseInt(pos[0]);
    this.pos.posY = parseInt(pos[1]);
    this.pos.dir = parseInt(pos[2]);
    this.service.requestMap();
  }
}
