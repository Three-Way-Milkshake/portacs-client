import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:8090/");
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ManageListService {

  constructor() { }

  confirm(list: string[]){
    socket.emit("newlisttask", list);
    console.log(list);
  }

  response(){
    return new Observable(observer => {
      socket.on('responsenewlist', (msg: string) => {
        observer.next(msg);
      });
    });
  }
}
