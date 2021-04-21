import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { TasklistService } from '../services/tasklist.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  showButton : boolean = false;
  lista : string [] = [];

  constructor(private service: TasklistService, private ngZone: NgZone) {}

  ngOnInit() {
    //update list
    this.service.onNewList().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));
      });      
    });
    //show button
    this.service.onGetButton().subscribe( () =>{
      this.ngZone.run(() => {
        console.log("mostro il pulsante di task");
        this.showButton = true;
      })
    })
  }

  
  
  taskCompletata() {
    this.service.doneTask();
    this.showButton = false;
  }

  

  setValues(data : string) {
    this.lista = [];
    for (let i = 0; i < data.length; i++) {
      this.lista[i] = data[i];
    }
  }
  

}

