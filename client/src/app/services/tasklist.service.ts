
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from '../../environments/environment';
const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);

@Injectable({
  providedIn: 'root'
})
export class TasklistService {

  constructor() {
    
  }

  onGetButton() {
    return new Observable(observer => {
      socket.on('completedtaskbutton', () => {
        console.log("service mostra pulsante")
        observer.next();
      });
    });
  }
  
  onGotoBase(){
    return new Observable(observer => {
      socket.on('gotobase', () => {
        observer.next();
      });
    });
  }

  onNewList() {
    return new Observable(observer => {
      socket.on('lista', (list: string) => {
        observer.next(list);
      });
    });
  }

  doneBase(){
    return new Observable(observer => {
      socket.on('arrivedbase', (list: string) => {
        observer.next(list);
      });
    });
  }
  doneTask(){
    socket.emit("taskcompletata");
    
  }
}
