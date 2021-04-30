
import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { POIListService } from 'src/app/generic/generic-service/poilist.service';
import { ManageMapService } from '../admin-services/manage-map.service';

@Component({
  selector: 'app-manage-map',
  templateUrl: './manage-map.component.html',
  styleUrls: ['./manage-map.component.css']
})
export class ManageMapComponent implements OnInit {
  map : string = '';
  tmp : string[][] = [];
  listPOIID : string[] = [];
  listPOIx : number[] = [];
  listPOIy : number[] = [];
  listPOIt : string[] = [];
  displaySelection : boolean = false;
  lastButtonI : number;
  lastButtonJ : number;
  constructor(private service : ManageMapService, private ngZone: NgZone, private servicePOI: POIListService) { }

  ngOnInit(): void {
    this.getValues();
    this.servicePOI.getPOIManageMap();
    this.service.onNewMap().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));
      });      
    });

    this.servicePOI.onPOIManageMap().subscribe((data : string[]) => {
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
    }
    
  }
  setValues(data : string) {
    this.tmp[0] = [];
    let k = 0; //virgole
    let j = 0; //parentesi
    let i = 2;
    while(i < data.length) {
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
  }
  setPOIonMap() {
    for (let i = 0; i < this.listPOIID.length; i++){
      this.tmp[this.listPOIx[i]][this.listPOIy[i]] = this.listPOIID[i];
    }
  } 

  getValues(){
    this.service.getValues();
  }
  
  newRow(){
    let l : number = this.tmp.length;
    this.tmp[this.tmp.length] = [];
    for (let i : number = 0; i < this.tmp[0].length; i++) {
      this.tmp[l][i] = "1";
    }
  }
  
  deleteRow(){
    if (this.tmp.length > 1) {
      this.tmp.pop();
    }
  }

  newCol(){
    let l : number = this.tmp[0].length;
    for (let i : number = 0; i < this.tmp.length; i++) {
      this.tmp[i][l] = "1";
    }
  }
  deleteCol(){
    if(this.tmp[0].length > 1){
      for (let i : number = 0; i < this.tmp.length; i++) {
        this.tmp[i].pop();
      }
    }   
  }

  pressedButton(i : number, j : number){
    this.displaySelection = true;
    this.lastButtonI = i;
    this.lastButtonJ = j;
    //this.tmp[0].length = numero colonne
    //this.tmp.length = numero righe
  }
  
  changeType(type : string){
    this.tmp[this.lastButtonI][this.lastButtonJ] = type.toString();
    this.displaySelection = false;
  }

  confirmMap(){
    this.service.changeMap(this.tmp);
  }
}
