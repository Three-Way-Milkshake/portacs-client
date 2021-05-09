import { StartbuttonService } from './../services/startbutton.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startbutton',
  templateUrl: './startbutton.component.html',
  styleUrls: ['./startbutton.component.css']
})
export class StartButtonComponent {
  isOnScreen : boolean = true;

  constructor(private service: StartbuttonService) { }

  start() {
    this.service.onPress();
    this.isOnScreen = false;
  }
}
