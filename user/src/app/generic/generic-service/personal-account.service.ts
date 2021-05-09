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
  onNewEcc() {
    return new Observable(observer => {
      socket.on('ecc', (data : string) => {
        observer.next(data);
      });
    });
  }
  
  correctLogin() {
    return new Observable(observer => {
      socket.on('logincorrect', (information: string) => {
        observer.next(information);
      });
    });
  }
  failLogin() {
    return new Observable(observer => {
      socket.on('loginerror', (information: string) => {
        observer.next(information);
      });
    });
  }

  sendNewUserInformation(name: string, surname: string, password: string) {
    socket.emit("newuserinformation", name + "," + surname + "," + password);
  }

  getValues() {
    socket.emit("getinfoaccount");
  }

  login(name : string, password : string) {
    socket.emit("login", name+","+password);
  }

  logout() {
    socket.emit("logout");
  }
}
