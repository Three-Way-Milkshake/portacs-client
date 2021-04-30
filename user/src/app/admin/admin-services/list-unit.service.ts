import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:8090/");
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ListUnitService {
  onNewListUnit() {
    return new Observable(observer => {
      socket.on('viewlistunit', (msg: string) => {
        observer.next(msg);
      });
    });
  }
  response(){
    return new Observable(observer => {
      socket.on('responsenewunit', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  responseDelete(){
    return new Observable(observer => {
      socket.on('responsedeleteunit', (msg: string) => {
        observer.next(msg);
      });
    });
  }
  constructor() { }

  getListUnit() {
    socket.emit("getlistunit");
  }
  newUnit(id: string){
    socket.emit("newunit", id);
  }

  deleteUnit(unit: string){
    socket.emit("deleteunit", unit);
  }
}