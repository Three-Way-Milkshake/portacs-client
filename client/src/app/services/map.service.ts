import { Injectable, Output } from '@angular/core';

import { io } from "socket.io-client";
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor() { }

  onNewPOIList() {
    return new Observable(observer => {
      socket.on('poilistmap', (msg: string) => {
        observer.next(msg);
      });
    });
  }
  

  onNewMap() {
    return new Observable(observer => {
      socket.on('mappa', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  onNewAction() {
    return new Observable(observer => {
      socket.on('updatemap', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  onNewPOI(){
    return new Observable(observer => {
      socket.on('updatePOI', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  requestPOI() {
    socket.emit("requestPOI");
  }

  requestMap() {
    socket.emit("mappa");
  }

}