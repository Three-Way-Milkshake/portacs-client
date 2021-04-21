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
  map: string = ''; //html
  tmp : string[][] = [];
  pos: UnitPosition;
  nextPOI: string = '';
  constructor(private service: MapService, private ngZone: NgZone) {
    this.pos = {posX: environment.x, posY: environment.y, dir: 0};
   }

  ngOnInit() {
    this.service.onNewAction().subscribe((data) => {
      this.ngZone.run(() => {
        this.changePosition(String(data));

      });
    })

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
    this.tmp[this.pos.posY][this.pos.posX] = this.dirToIntArray(); //metto il muletto nella mappa con la sua direzione
    
  }

  dirToIntArray() {
    if (this.pos.dir == 0) {        // facing NORD
      return "6";
    } else if (this.pos.dir == 1) { // facing EAST
      return "7";
    } else if (this.pos.dir == 2) { // facing SOUTH
      return "8";
    } else if (this.pos.dir == 3) { // facing WEST
      return "9";
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
