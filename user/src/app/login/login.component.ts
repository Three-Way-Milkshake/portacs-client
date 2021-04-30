import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { PersonalAccountService } from './../generic/generic-service/personal-account.service';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorLogin : string = "";
  username: string = "";
  password : string = "";
  isNotLoggedIn : boolean = (sessionStorage.getItem('isLoggedIn') == 'FALSE');

  constructor(private router: Router, private service : PersonalAccountService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.service.failLogin().subscribe((data : string) =>{
      this.ngZone.run(() => {
        this.errorLogin = data;
      }); 
    });
  }
  
  // window.location.reload();
   
  login() {
    this.service.login(this.username, this.password);
  }

}
