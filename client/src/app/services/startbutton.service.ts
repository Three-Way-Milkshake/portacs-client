import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from '../../environments/environment';
const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);

@Injectable({
  providedIn: 'root'
})
export class StartbuttonService {

  constructor() { }

  onNewStart() {
    return new Observable(observer => {
      socket.on('startbutton', () => {
        observer.next();
      });
    });
  }

  onNewWaiting() {
    return new Observable(observer => {
      socket.on('showrequestlist', () => {
        observer.next();
      });
    });
  }

  onNewError(){
    return new Observable(observer => {
      socket.on('shownolist', () => {
        observer.next();
      });
    });
  }
  requestList() {
    socket.emit('reqlist');
  }

  onPress() {
    socket.emit('start');
  }
}

