import { Component, OnInit } from '@angular/core';
import { ViewListManagerService } from '../admin-services/view-list-manager.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-view-list-manager',
  templateUrl: './view-list-manager.component.html',
  styleUrls: ['./view-list-manager.component.css']
})
export class ViewListManagerComponent implements OnInit {
  listManagerName : string[] = [];
  listManagerSurname : string[] = [];
  listManagerId : string[] = [];
  elimination : boolean = false;
  edit : boolean = false;
  error : boolean = false;
  msg : string;
  password : string;
  constructor(private service : ViewListManagerService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.service.getListManager();
    this.service.onNewListManager().subscribe((data : string[]) => {
      this.ngZone.run(() => {
        this.setValues(data)
      });      
    });

    this.service.confirmElimination().subscribe((data : string ) => {
      this.ngZone.run(() => {
        let dataTmp = data.split(",");
        if (dataTmp[0] = "OK") {
          this.elimination = true;
        } else {
          this.error = true;
          this.msg = dataTmp[1];
        }
      }); 
    });

    this.service.responseEdit().subscribe((data : string) => {
      this.ngZone.run(() => {
        let tmpData = data.split(",");
        if (tmpData[0] == "OK") {
          this.edit = true;
        } else {
          this.error = true;
          this.msg = tmpData[1];
        }
      });
    });

    this.service.responsePsw().subscribe((data : string) => {
      this.ngZone.run(() => {
        this.password = data;
      });
    });
  }

  setValues(data : string[]) {
    let tmpString : string[];
    for (let i = 0; i < data.length; i++) {
      tmpString = data[i].split(",")
      this.listManagerId[i] = tmpString[0];
      this.listManagerName[i] = tmpString[1];
      this.listManagerSurname[i] = tmpString[2];
    }
  }
  

  delete(id : string){
    this.service.delete(id);
  }

  modify(id : string, name: string, surname: string){
    this.service.modify(id, name, surname);
  }

  reset(id : string){
    this.service.reset(id);
  }

}
