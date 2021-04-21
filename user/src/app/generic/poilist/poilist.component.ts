import { POIListService } from './../generic-service/poilist.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-poilist',
  templateUrl: './poilist.component.html',
  styleUrls: ['./poilist.component.css']
})
export class POIListComponent implements OnInit {
  list: string[] = [];
  constructor(private service : POIListService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getValues();
    this.service.onNewPOIList().subscribe((data) => {
      this.ngZone.run(() => {
        this.setValues(String(data));
        
      });      
    });
  }

  setValues(s: string) {
    let tmp : string[] = s.split(",");
    for (let i = 0; i < tmp.length; i++){
      this.list[i] = tmp[i];
    }
  }
  getValues() {
    this.service.getValues();
  }

}
