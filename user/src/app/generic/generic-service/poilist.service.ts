import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:8090/");
@Injectable({
  providedIn: 'root'
})
export class POIListService {
  constructor() { }

  onNewPOIList() {
    return new Observable(observer => {
      socket.on('poilist', (information: string) => {
        observer.next(information);
      });
    });
    
  }
  getValues() {
    socket.emit("getpoilist");
  }

  getPOIMap(){
    socket.emit("getpoilistmap");
  }
  getPOIManageMap(){
    socket.emit("getpoilistmanagemap");
  }

  onPOIMap(){
    return new Observable(observer => {
      socket.on('poilistmap', (information: string) => {
        observer.next(information);
      });
    });
  }
  onPOIManageMap(){
    return new Observable(observer => {
      socket.on('poilistmanagemap', (information: string) => {
        observer.next(information);
      });
    });
  }
}
