import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { /*------------------------------MODIFICARE------------------------------------ */
  isLoggedin: boolean = true;
  isAdmin: boolean = true;
  title = 'user';
  

}
