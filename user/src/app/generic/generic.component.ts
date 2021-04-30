import { Component, OnInit } from '@angular/core';
import { PersonalAccountService } from './generic-service/personal-account.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.css']
})
export class GenericComponent implements OnInit {
  isAdmin : boolean = this.checkIsAdmin();
  isManager : boolean = this.checkIsManager();
  isLoggedIn : boolean = this.checkIsLoggedIn();
  constructor(private service : PersonalAccountService, private ngZone: NgZone) {
    this.checkSession();
  }

  checkIsAdmin() {
    return sessionStorage.getItem('isAdmin') == 'TRUE';
  }
  checkIsManager() {
    return sessionStorage.getItem('isManager') == 'TRUE';
  }
  checkIsLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') == 'TRUE';
  }

  checkSession() {
    if (sessionStorage.length == 0) {
      sessionStorage.setItem('isLoggedIn', 'FALSE');
      sessionStorage.setItem('isAdmin', 'FALSE');
      sessionStorage.setItem('isManager', 'FALSE');
    }
  }

  ngOnInit(): void {
    this.service.correctLogin().subscribe((data : string) =>{
      this.ngZone.run(() => {
        this.checkLogin(data);
      }); 
    });
  }

  checkLogin(str : string) {
    if (str == "ADMIN") {
      sessionStorage.setItem('isAdmin', 'TRUE');
      this.isAdmin = true;
      sessionStorage.setItem('isManager', 'FALSE');
      this.isManager = false;
    } else {
      sessionStorage.setItem('isAdmin', 'FALSE');
      this.isAdmin = false;
      sessionStorage.setItem('isManager', 'TRUE');
      this.isManager = true;
    }
    sessionStorage.setItem('isLoggedIn', 'TRUE');
    this.isLoggedIn = true;
    window.location.reload();
  }

  logout() {
    sessionStorage.clear();
    this.isAdmin = false;
    this.isManager = false;
    this.isLoggedIn = false;
    this.service.logout();
    setTimeout(function(){ window.location.reload(); }, 100);
  }
}
