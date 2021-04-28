import { Component, OnInit } from '@angular/core';
import { ViewListManagerService } from '../admin-services/view-list-manager.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-view-list-manager',
  templateUrl: './view-list-manager.component.html',
  styleUrls: ['./view-list-manager.component.css']
})
export class ViewListManagerComponent implements OnInit {
  listManager : string[] = [];
  constructor(private service : ViewListManagerService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.service.getListManager();
    this.service.onNewListManager().subscribe((data : string[]) => {
      this.ngZone.run(() => {
        this.listManager = data;
      });      
    });
  }

}
