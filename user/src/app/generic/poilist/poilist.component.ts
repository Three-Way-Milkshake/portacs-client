import { POIListService } from './../generic-service/poilist.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-poilist',
  templateUrl: './poilist.component.html',
  styleUrls: ['./poilist.component.css']
})
export class POIListComponent implements OnInit {
  list: string[] = [];
  id: string[] = [];
  name : string[] = [];
  type: string[] = [];
  constructor(private service : POIListService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getValues();
    this.service.onNewPOIList().subscribe((data : string[]) => {
      this.ngZone.run(() => {
        this.setValues(data);
        
      });      
    });
  }

  setValues(s: string[]) {
    for (let k = 0; k < s.length; k++) {
      let tmp : string[] = s[k].split(",");
      this.list[k] = "ID: "+tmp[1]+", Nome: "+tmp[2] +", Tipo: "+ this.typeToName(parseInt(tmp[0]));
      
    }

    for (let k = 0; k < s.length; k++) {
      let tmp : string[] = s[k].split(",");
      this.id[k] = tmp[1];
      this.name[k] = tmp[2];
      this.type[k] = this.typeToName(parseInt(tmp[0]));
      
    }

  }

  typeToName(id: number) {
    if (id == 0) {
      return "Carico";
    } else if (id == 1) {
      return "Scarico"
    } else if (id == 2) {
      return "Base";
    } else {
      return "";
    }
  }

  getValues() {
    this.service.getValues();
  }

}
