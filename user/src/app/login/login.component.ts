import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password : string = "";
  isLoggedin: boolean = false;
  isAdmin: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  checkLogin(str : string) {
    if (str == "admin") {
      this.isLoggedin = true;
      this.isAdmin = true;
      this.router.navigate(['admin']);
    } else if (str == "manager") {
      this.isLoggedin = true;
      this.isAdmin = false;
      this.router.navigate(['manager']);
    } else {
      this.isLoggedin = false;
    }
    // ----------------------- da controllare reload -------------------
    window.location.reload();
  }

  login() { //---------------------------------------testing--------------------------
    this.isLoggedin = true;
    this.isAdmin = true;
    //this.router.navigate(['admin']);
    window.location.reload();
   //io.emit("login", username+","+password);
  }

}
