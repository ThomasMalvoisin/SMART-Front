import { Component, OnInit } from '@angular/core';
import { BusStopService } from 'src/app/services/bus-stop.service';

@Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.scss']
})
export class AppComponent {
      title = 'SMART-Front';

      constructor(private busStopService: BusStopService) { }

      ngOnInit() {
      }
}
