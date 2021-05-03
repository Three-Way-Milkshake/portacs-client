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
  listPOIID : string[] = [];
  listPOIx : number[] = [];
  listPOIy : number[] = [];
  listPOIt : string[] = [];
  listPOIName: string[] = [];
  constructor(private service: MapService, private ngZone: NgZone) {
    this.pos = {posX: environment.x, posY: environment.y, dir: 0};
   }
  ngOnInit() {
    this.service.requestPOI();
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
        this.nextPOI = String(data);
        console.log(data);
      });
    });
  }

  savePOI(data : string) {
    console.log(data);
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
    this.tmp[this.pos.posY][this.pos.posX] = this.dirToIntArray(); //metto il muletto nella mappa con la sua direzione
    
  }

  setPOIonMap() {
    for (let i = 0; i < this.listPOIID.length; i++){
      this.tmp[this.listPOIx[i]][this.listPOIy[i]] = this.listPOIName[i];
    }
    console.log(this.tmp);
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
