import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { ListUnitService } from '../admin-services/list-unit.service';
@Component({
  selector: 'app-list-unit',
  templateUrl: './list-unit.component.html',
  styleUrls: ['./list-unit.component.css']
})
export class ListUnitComponent implements OnInit {
  listUnit : string[] = [];
  newUnit : string;
  selectedUnit : string;
  added : boolean = false;
  deleted : boolean = false;
  token : string;
  fail: boolean = false;
  msg : string
  
  constructor(private service : ListUnitService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.service.getListUnit();
    this.service.onNewListUnit().subscribe((data : string[]) => {
      this.ngZone.run(() => {
        this.selectedUnit = data[0];
        this.listUnit = data;
      });      
    });

    this.service.responseDelete().subscribe((data : string) => {
      this.ngZone.run(() => {
        let tmpData = data.split(",");
        if (tmpData[0] == "OK") {
          this.deleted = true;
          this.fail = false;
          this.added = false;
        } else {
          this.fail = true;
          this.added = false;
          this.deleted = false;
          this.msg = tmpData[1];
        }
      });      
    });

    this.service.response().subscribe((data : string) => {
      this.ngZone.run(() => {
        let tmpData = data.split(",");
        
        if (tmpData[0] == "OK") {
          this.added = true;
          this.fail = false;
          this.deleted = false;
          this.token = tmpData[1];
        } else {
          this.fail = true;
          this.deleted = false;
          this.added = false;
          this.msg = tmpData[1];
        }
      });      
    });

  }

  registration(){
    this.service.newUnit(this.newUnit);
  }

  delete(){
    this.service.deleteUnit(this.selectedUnit);
  }
}
