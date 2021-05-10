import { StartbuttonService } from './../services/startbutton.service';
import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-startbutton',
  templateUrl: './startbutton.component.html',
  styleUrls: ['./startbutton.component.css']
})
export class StartButtonComponent implements OnInit {
  isOnScreen : boolean = true;

  constructor(private service: StartbuttonService, private ngZone: NgZone) { }

  ngOnInit(){
    this.service.onNewStart().subscribe(() => {
      this.ngZone.run(() => {
        this.isOnScreen = true;
      });      
    });
  }

  start() {
    this.service.onPress();
    this.isOnScreen = false;
  }
}
