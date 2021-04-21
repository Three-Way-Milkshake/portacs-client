import { AdminNotificationService } from './../services/admin-notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.css']
})
export class AdminNotificationComponent implements OnInit {

  constructor(private service: AdminNotificationService) { }

  ngOnInit(): void {
  }

  adminNotify(){
    this.service.onPress();
  }

}
