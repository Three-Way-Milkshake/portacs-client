import { logging } from 'protractor';
import { TaskListsService } from './../manager-services/task-lists.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.css']
})
export class TaskListsComponent implements OnInit {
  ass: string[] = []
  notAss : string[] = [];
  constructor(private service: TaskListsService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.service.getListAss();
    this.service.getListNotAss();
    this.service.onNewListAss().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));

      });      
    });
    
    this.service.onNewListNotAss().subscribe((data) => {
      this.ngZone.run(() => {
        this.setLists(String(data));
        console.log(data)
      });      
    });
  }
  setValues(data){
    let tmp = 0;
    for(let i = 0; i < data.length; i++){
      if (data[i] == "]"){
        tmp++;
      }else if (data[i] !== "[" ){
       
        this.ass[tmp] += data[i];
      } else {
      }
    }
    
  }

  setLists(data) {
    let tmp = 0;
    for (let i = 0; i< data.length; i++)
    {
      if(data[i] === ";")
      {
        tmp ++;
      } else {
        this.notAss[tmp] += data[i];
      }
    }
  }

}
