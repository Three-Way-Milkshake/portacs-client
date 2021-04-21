import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:8090/");
@Injectable({
  providedIn: 'root'
})
export class PersonalAccountService {

  constructor() { }

  onNewUser() {
    return new Observable(observer => {
      socket.on('userinformation', (information: string) => {
        observer.next(information);
        console.log(information);
      });
    });
    
  }

  sendNewUserInformation(name: string, surname: string, password: string) {
    socket.emit("newuserinformation", name + "," + surname + "," + password);
  }

  getValues() {
    socket.emit("getinfoaccount");
  }
}
