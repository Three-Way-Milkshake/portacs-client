import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:8090/");
@Injectable({
  providedIn: 'root'
})
export class TaskListsService {

  constructor() { }
  onNewListAss() {
    return new Observable(observer => {
      socket.on('listAss', (list: string) => {
        observer.next(list);
        
      });
    });
  }
  onNewListNotAss() {
    return new Observable(observer => {
      socket.on('listnotAss', (list: string) => {
        observer.next(list);
      });
    });
  }

  getListAss(){
    socket.emit("getlistAss");
  }

  getListNotAss(){
    socket.emit("getlistNotAss");
  }

  remove(id : string){
    socket.emit("removeList", id);
  }
}
