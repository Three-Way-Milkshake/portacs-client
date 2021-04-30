import { Component, OnInit } from '@angular/core';
import { PersonalAccountService } from './generic-service/personal-account.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.css']
})
export class GenericComponent implements OnInit {
  isAdmin : boolean = false;
  isManager : boolean = false;
  isLoggedIn : boolean = false;
  constructor(private service : PersonalAccountService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.service.correctLogin().subscribe((data : string) =>{
      this.ngZone.run(() => {
        this.checkLogin(data);
      }); 
    });
  }

  checkLogin(str : string) {
    this.isAdmin = str=="ADMIN";
    this.isManager = str=="MANAGER";
    this.isLoggedIn = true;
  }

  logout() {
    this.isAdmin = false;
    this.isManager = false;
    this.isLoggedIn = false;
    this.service.logout();
  }

}
