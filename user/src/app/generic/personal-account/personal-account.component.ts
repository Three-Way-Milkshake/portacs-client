import { PersonalAccountService } from './../generic-service/personal-account.service';
import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})
export class PersonalAccountComponent implements OnInit {
  name: string;
  surname: string;
  password: string;
  constructor(private service: PersonalAccountService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.getValues();
    this.service.onNewUser().subscribe((data) => {
      this.ngZone.run(() => {
        
        this.setValues(String(data));
      
      });      
    });
    
   
  }
  

  save(name: string, surname: string, password: string) {
    this.name = name;
    this.surname = surname;
    this.password = password;
    console.log(this.name)
    console.log(this.surname)
    console.log(this.password)
    this.service.sendNewUserInformation(name, surname, password);
  }

  setValues(data: string) {
    let tmp : string[] = data.split(",");
    this.name = tmp [0];
    this.surname = tmp[1];
    this.password = tmp[2];
  }

  getValues() {
    this.service.getValues();
  }

}
