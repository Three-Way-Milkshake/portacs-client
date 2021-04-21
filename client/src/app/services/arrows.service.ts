import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);

@Injectable({
  providedIn: 'root'
})
export class ArrowsService {

  constructor() { }

  onNewArrows() {
    return new Observable(observer => {
      socket.on('arrows', (msg: string) => {
        observer.next(msg);
      });
    });
  }
}
