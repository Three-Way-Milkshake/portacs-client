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

  constructor() { }

  getListManager() {
    socket.emit("getlistmanager");
  }
}
