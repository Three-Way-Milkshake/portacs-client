
import { TaskListsService } from './../manager-services/task-lists.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { TypeModifier } from '@angular/compiler/src/output/output_ast';

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
        this.ass = [];
        for (let i = 0; i < data.length; i++) {
          let str = data[i].split(',');
          if (str.length > 1) {
            this.ass.push(data[i]);
          }
        }
      });      
    });
    
    this.service.onNewListNotAss().subscribe((data : string[]) => {
      this.ngZone.run(() => {
        this.setValues(data);  
      });      
    });

  }

  remove(a){
    let tmp = a.split(",");
    let x = tmp[0].split(":");
    let x2 = x[1].split(';');
    console.log(x2[0]);
    this.service.remove(x2[0]);  
  }
  
  setValues(data: string[]){
    this.notAss = [];
    console.log(data);
    for (let i= 0; i < data.length; i++){ // per ogni lista di task
      this.notAss[i] = "";
      let tmp = data[i].split(',');
      this.notAss[i] += "id:" +tmp[0] + "; task: ";
      for (let j=1; j<tmp.length; j=j+3){
        this.notAss[i] += tmp[j+2] + (tmp.length-(j+2)==1? "" : ", ");
      }
    }
  }
}
