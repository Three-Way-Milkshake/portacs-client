import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:8090/");
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistrationManagerService {

  onNewRegistration() {
    return new Observable(observer => {
      socket.on('responseregistration', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  constructor() { }

  registration(name : string, surname : string) {
    socket.emit("registration", name + "," + surname);
  }

}
