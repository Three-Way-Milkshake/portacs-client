import { Component, OnInit } from '@angular/core';
import { RegistrationManagerService } from '../admin-services/registration-manager.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-registration-manager',
  templateUrl: './registration-manager.component.html',
  styleUrls: ['./registration-manager.component.css']
})
export class RegistrationManagerComponent implements OnInit {
  name : string = "";
  surname : string = "";
  id : string = "";
  pwd : string = "";
  response : boolean = false;
  constructor(private service : RegistrationManagerService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.service.onNewRegistration().subscribe((data : string) => {
      this.ngZone.run(() => {
        let tmpStr = data.split(",");
        this.id = tmpStr[0];
        this.pwd = tmpStr[1];
        this.response = true;
      });      
    });
  }

  registration() {
    if (this.name != "" && this.surname != "") {
      this.service.registration(this.name, this.surname);
    }
  }
}
