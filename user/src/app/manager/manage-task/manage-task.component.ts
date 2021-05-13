import { ManageListService } from './../manager-services/manage-list.service';
import { POIListService } from './../../generic/generic-service/poilist.service';
import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {
  selectedPoi : string;
  poi : string[] = [];
  view : string[] = [];
  newList : string[] = [];
  added : boolean= false;
  error : boolean = false;
  newId : string;
  msg : string;
  constructor(private poiService: POIListService, private ngZone: NgZone, private service: ManageListService) { }

  ngOnInit(): void {
    this.poiService.getValues();
    this.poiService.onNewPOIList().subscribe((data: string[]) => {
      this.ngZone.run(() => {
        this.setValues(data);
      });      
    });

    this.service.response().subscribe((data) => {
      this.ngZone.run(() => {
        this.confermation(String(data));
      });      
    });

  }

  confermation(d : string) {
    this.added = true;
    let tmp = d.split(",");
    if (tmp[0] == "OK") {
      this.error = false;
      this.newId = tmp[1];
    } else if (tmp[0] == "FAIL") {
      this.msg = tmp[1];
      this.error = true;
    }
    this.newList = [];
  }
  add(sP : string){
    /*
    let tmp : string = ((sP.split(",")[0]).split(':')[1]).trim();
    this.newList.push(this.poi[this.findIndexByName(tmp)]);
    */
   this.newList.push(sP);
  }

  deleteCurrentTask(l : string){
    let index = this.newList.indexOf(l);
    if (index > -1) {
      this.newList.splice(index, 1);
   }
  }

  confirm(){
    if(this.newList.length != 0){
      let arr : string[] = [];
      for(let i= 0; i < this.newList.length; i++){
        let tmp : string = ((this.newList[i].split(",")[0]).split(':')[1]).trim();
        arr.push(this.poi[this.findIndexByName(tmp)]);
      }
      this.service.confirm(arr);
    }
  }

  typeToName(id: number) {
    if (id == 0) {
      return "Carico";
    } else if (id == 1) {
      return "Scarico"
    } else if (id == 2) {
      return "Base";
    } else {
      return "";
    }
  }

  findIndexByName(name : string) {
    for (let i = 0; i < this.poi.length; i++) {
      let tmpName = this.poi[i].split(',')[2];
      if (name == tmpName) {
        return i;
      }
    }
    return -1;
  }

  setValues(s: string[]) {
    if (typeof s !== 'undefined') {
      if (s.length > 0) {
        this.selectedPoi = s[0];
      }
      let t = 0;
      for (let i = 0; i < s.length; i++){
        let tmp : string[] = s[i].split(",");
        if (parseInt(tmp[0]) != 2) {
          this.view[t] = "Nome: " + tmp[2] + ", Tipo POI: " + this.typeToName(parseInt(tmp[0]));
          t++;
        }
        this.poi[i] = s[i];
      }
    }
  }
}
