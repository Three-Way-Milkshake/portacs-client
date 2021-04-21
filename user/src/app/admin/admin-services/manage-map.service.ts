import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:8090/");
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ManageMapService {
  onNewMap() {
    return new Observable(observer => {
      socket.on('managemap', (msg: string) => {
        console.log(msg);
        observer.next(msg);
      });
    });
  }
  getValues() {
    socket.emit("getmanagemap");
  }
  changeMap(map : string[][]){
    socket.emit("changedmap", map);
  }
  constructor() { }
}
