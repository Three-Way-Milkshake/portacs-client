import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { TasklistService } from '../services/tasklist.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  showTable : boolean = true;
  showButton : boolean = false;
  lista : string [] = [];
  normal : boolean = true;
  constructor(private service: TasklistService, private ngZone: NgZone) {}

  ngOnInit() {
    //update list
    this.service.onNewList().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));
        console.log("normal = true");
        this.normal = true;
        this.showTable = true;
      });      
    });
    //show button
    this.service.onGetButton().subscribe(() =>{
      this.ngZone.run(() => {
        console.log("mostro il pulsante di task");
        this.showButton = true;
      });
    });

    this.service.onGotoBase().subscribe(() =>{
      this.ngZone.run(() => {
        console.log("normal = false");
        this.normal = false;
      });
    });
    this.service.doneBase().subscribe(() =>{
      this.ngZone.run(() => {
        this.normal = true;
        this.showTable = false;
      });
    });
  }

  
  
  taskCompletata() {
    this.service.doneTask();
    this.showButton = false;
  }

  

  setValues(data : string) {
    this.lista = [];
    let tmp = data.split(",");
    for (let i = 0; i < tmp.length; i++) {
      this.lista[i] = tmp[i];
    }
  }
  

}

