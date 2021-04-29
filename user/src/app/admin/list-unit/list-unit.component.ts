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
  constructor(private service : ListUnitService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.service.getListUnit();
    this.service.onNewListUnit().subscribe((data : string[]) => {
      this.ngZone.run(() => {
        this.listUnit = data;
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
