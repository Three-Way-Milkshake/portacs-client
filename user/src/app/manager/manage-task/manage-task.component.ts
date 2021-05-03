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
    this.newList.push(sP);
  }

  deleteCurrentTask(l : string){
    let index = this.newList.indexOf(l);
    if (index > -1) {
      this.newList.splice(index, 1);
   }
  }

  confirm(){
    this.service.confirm(this.newList);
  }

  setValues(s: string[]) {
    //let tmp : string[] = s.split(",");
    if (s.length > 0) {
      this.selectedPoi = s[0];
    }
    for (let i = 0; i < s.length; i++){
      this.poi[i] = s[i];
    }
  }
  
}
