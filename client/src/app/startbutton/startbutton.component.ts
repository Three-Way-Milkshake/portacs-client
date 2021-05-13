import { StartbuttonService } from './../services/startbutton.service';
import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-startbutton',
  templateUrl: './startbutton.component.html',
  styleUrls: ['./startbutton.component.css']
})
export class StartButtonComponent implements OnInit {
  isOnScreen : boolean = true;
  isReqList : boolean = false;
  err : boolean = false;
 

  constructor(private service: StartbuttonService, private ngZone: NgZone) { }

  ngOnInit(){
    this.service.onNewStart().subscribe(() => {
      this.ngZone.run(() => {
        this.isOnScreen = true;
        console.log("mostro pulsante start");
      });      
    });
    this.service.onNewWaiting().subscribe(() => {
      this.ngZone.run(() => {
        this.isReqList = true;
      });      
    });
    
    this.service.onNewError().subscribe(() => {
      this.ngZone.run(() => {
        this.err = true;
      });      
    });
  }

  list() {
    this.service.requestList();
    this.isReqList = false;
    this.err = false;
  }

  start() {
    this.service.onPress();
    this.isOnScreen = false;
  }
}
