import { ManualdrivingService } from './../services/manualdriving.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-manualdriving',
  templateUrl: './manualdriving.component.html',
  styleUrls: ['./manualdriving.component.css']
})
export class ManualDrivingComponent {
  stop : boolean = false;
  cmd : string = 'Start';
  constructor(private service : ManualdrivingService) { }

  movement(dir : string) {
    this.service.onMovement(dir);
  }

  startstop() {
    if (this.stop) {
      this.service.stop();
      this.cmd = 'Start';
    } else {
      this.service.start();
      this.cmd = 'Stop';
    }
    this.stop = !this.stop;
  }

}
