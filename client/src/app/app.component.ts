import { ArrowsComponent } from './arrows/arrows.component';
import { Component } from '@angular/core';
import { io } from "socket.io-client";
import { environment } from './../environments/environment';

const socket = io(`http://127.0.0.1:${environment.socketio_port}/`);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  automatica : boolean = true; // cosa diverrà
  guida : string = 'manuale';
  

  cambio() {
    if (this.automatica) {
      this.guida = 'automatica';
      socket.emit('manuale');
    } else {
      this.guida = 'manuale';
      socket.emit('automatica');
    }
    this.automatica = !this.automatica;
  }

}
