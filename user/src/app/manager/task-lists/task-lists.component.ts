
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
    this.service.onNewListAss().subscribe((data : string []) => {
      this.ngZone.run(() => {
        this.ass = data;
      });      
    });
    
    this.service.onNewListNotAss().subscribe((data : string[]) => {
      this.ngZone.run(() => {
        this.notAss = data
        
      });      
    });

  }

  remove(a){
    console.log(a);
    let tmp = a.split(",");
    this.service.remove(tmp[0]);
    
  }
  
  

}
