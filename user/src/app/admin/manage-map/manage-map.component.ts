
import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { ManageMapService } from '../admin-services/manage-map.service';

@Component({
  selector: 'app-manage-map',
  templateUrl: './manage-map.component.html',
  styleUrls: ['./manage-map.component.css']
})
export class ManageMapComponent implements OnInit {
  map : string = '';
  tmp : string[][] = [];
  displaySelection : boolean = false;
  lastButtonI : number;
  lastButtonJ : number;
  constructor(private service : ManageMapService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getValues();
    this.service.onNewMap().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));
      });      
    });
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
    console.log(this.tmp);    
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
