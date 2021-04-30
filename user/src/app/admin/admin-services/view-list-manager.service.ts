import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:8090/");
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ViewListManagerService {
  onNewListManager() {
    return new Observable(observer => {
      socket.on('viewlistmanager', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  responseEdit(){
    return new Observable(observer => {
      socket.on('responseeditmanager', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  responsePsw(){
    return new Observable(observer => {
      socket.on('responseresetpwdmanager', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  constructor() { }

  getListManager() {
    socket.emit("getlistmanager");
  }

  delete(id : string) {
    socket.emit("removemanager", id);
  } 

  confirmElimination(){
    return new Observable(observer => {
      socket.on('responseeliminationU', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  modify(id : string, name: string, surname: string) {
    socket.emit("modifymanager", id + "," + name + "," + surname);
  }

  reset(id: string) {
    socket.emit("resetmanager",id);
  }
}
