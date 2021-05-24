
import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { POIListService } from 'src/app/generic/generic-service/poilist.service';
import { NewCellList } from 'src/app/newcelllist';
import { NewPoiList } from 'src/app/newpoilist';
import { ManageMapService } from '../admin-services/manage-map.service';

@Component({
  selector: 'app-manage-map',
  templateUrl: './manage-map.component.html',
  styleUrls: ['./manage-map.component.css']
})
export class ManageMapComponent implements OnInit {
  tmp : string[][] = [];
  listPOIID : string[] = [];
  listPOIx : number[] = [];
  listPOIy : number[] = [];
  listPOIt : string[] = [];
  listPOIName : string[] = [];
  displaySelection : boolean = false;
  lastButtonI : number;
  lastButtonJ : number;
  selectedType : string = "carico";
  poiMap : string[][] = [];
  listType: string[] = ["carico", "scarico", "uscita"];

  tmpPOI : NewPoiList[] = [];
  tmpCell : NewCellList[] = [];
  errore : boolean =false;
  msg : string = "";

  constructor(private service : ManageMapService, private ngZone: NgZone, private servicePOI: POIListService) { }

  ngOnInit(): void {
    this.servicePOI.getPOIManageMap();
    this.getValues();
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
    this.listPOIID = [];
  this.listPOIx  = [];
  this.listPOIy  = [];
  this.listPOIt = [];
  this.listPOIName  = [];
    for (let i = 0; i < data.length ; i++){
      
      let dataTmp = data[i].split(",");
      this.listPOIx[i] = parseInt(dataTmp[0]);
      this.listPOIy[i] = parseInt(dataTmp[1]);
      this.listPOIt[i] = dataTmp[2];
      this.listPOIID[i] = dataTmp[3];
      this.listPOIName[i] = dataTmp[4];
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
    if (this.listPOIx != null) {
      this.setNamePOIOnMap();
    }
  }

  setNamePOIOnMap() {
    this.poiMap = [];
    for (let t = 0; t < this.listPOIx.length; t++) {
      if (this.poiMap[this.listPOIx[t]] == null) {
        this.poiMap[this.listPOIx[t]] = [];
      }
      this.poiMap[this.listPOIx[t]][this.listPOIy[t]] = (this.listPOIName[t]).toString();
    }
  }

  setPOIonMap() {
    for (let i = 0; i < this.listPOIx.length; i++){
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
  
  noPOIRow(n : number) {
    for (let i = 0; i < this.listPOIx.length; i++) {
      console.log((this.listPOIx[i]+" > " + n));
      if (this.listPOIx[i] >= n-1) {
        return false;
      }
    }
    return true;
  }
  
  deleteRow(){
    if (this.tmp.length > 1 && this.noPOIRow(this.tmp.length)) {
      this.tmp.pop();
    } else {
      this.errore= true;
      this.msg = "elimina i POI presenti nella riga che si intende eliminare"
    }
  }

  newCol(){
    let l : number = this.tmp[0].length;
    for (let i : number = 0; i < this.tmp.length; i++) {
      this.tmp[i][l] = "1";
    }
  }
  
  noPOICol(n : number) {
    for (let i = 0; i < this.listPOIy.length; i++) {
      console.log((this.listPOIy[i]+" > " + n));
      if (this.listPOIy[i] >= n-1) {
        return false;
      }
    }
    return true;
  }

  deleteCol(){
    if(this.tmp[0].length > 1 && this.noPOICol(this.tmp[0].length)){
      for (let i : number = 0; i < this.tmp.length; i++) {
        this.tmp[i].pop();
      }
    }  else{
      this.errore= true;
      this.msg = "elimina i POI presenti nell'ultima colonna"
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
    this.addTempCell(this.lastButtonI, this.lastButtonJ, parseInt(type));
  }

  changePOI(name : string, type : string){
    let idTemp = 0;
    let tmpIdFromPos = this.idFromPosition(this.lastButtonI, this.lastButtonJ);
    if (tmpIdFromPos != "") {
      idTemp = parseInt(tmpIdFromPos);
    }
    if (name != "") {
      this.tmp[this.lastButtonI][this.lastButtonJ] = this.typeStringToMap(type.toString());
      this.displaySelection = false;
      this.addTempPOI(this.lastButtonI, this.lastButtonJ, 6, idTemp, this.typeToEnum(type), name);
      this.listPOIx[this.listPOIx.length] = this.lastButtonI;
      this.listPOIy[this.listPOIy.length] = this.lastButtonJ;
      this.listPOIt[this.listPOIt.length] = this.typeToEnum(type).toString();
      this.listPOIName[this.listPOIName.length] = name;
      this.setNamePOIOnMap();
    }
    
  }

  typeToEnum(typeCell : string) {
    if (typeCell == "carico") {
      return 0;
    } else if (typeCell == "scarico") {
      return 1;
    } else if (typeCell == "uscita") {
      return 2;
    } else {
      return -1;
    }
  }

  addTempPOI(x : number, y : number, a : number, id: number, type : number, name: string) {
    this.tmpPOI[this.tmpPOI.length] = {x : x, y : y, a : a, id : id, t : type, name: name};
  }

  addTempCell(x : number, y : number, a : number) {
    this.tmpCell[this.tmpCell.length] = {x : x, y : y, a : a};
  }

  typeStringToMap(typeCell : string) {
    if (typeCell == "carico") {
      return "20";
    } else if (typeCell == "scarico") {
      return "21";
    } else if (typeCell == "uscita") {
      return "22";
    } else {
      return "-1";
    }
  }


  idFromPosition(x : number, y : number) {
    for (let i = 0; i < this.listPOIx.length; i++) {
      if (x == this.listPOIx[i] && y == this.listPOIy[i]){
        return this.listPOIID[i];
      }
    }
    return "";
  }

  

  confirmMap(){
    this.service.changeMap(this.tmp);
    console.log(this.tmp);
    for (let i = 0; i < this.tmpCell.length; i++) {
      let idBoh = this.idFromPosition(this.tmpCell[i].x, this.tmpCell[i].y);
      if (idBoh != "") {
        this.service.newCell(this.tmpCell[i].x+","+this.tmpCell[i].y+","+this.tmpCell[i].a + "," + idBoh);
      } else {
        this.service.newCell(this.tmpCell[i].x+","+this.tmpCell[i].y+","+this.tmpCell[i].a);
      }
    }
    this.tmpCell = [];
    for (let i = 0; i < this.tmpPOI.length; i++) {
      this.service.newPOI(this.tmpPOI[i].x+","+this.tmpPOI[i].y+","+this.tmpPOI[i].a+","+this.tmpPOI[i].id+","+this.tmpPOI[i].t+","+this.tmpPOI[i].name);
    }
    this.tmpPOI = [];
    // setTimeout(function(){ window.location.reload(); }, 300);
  }
}
