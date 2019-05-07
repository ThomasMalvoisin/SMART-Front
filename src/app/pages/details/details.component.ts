import { Component, OnInit, Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { BusStopService } from 'src/app/services/bus-stop.service';
// import { concat } from 'rxjs';
// import { DOCUMENT } from '@angular/common';

@Component({
      selector: 'app-details',
      templateUrl: './details.component.html',
      styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

      private busStops = {
            bus_stops: []
      };

      private recall = false;
      // @ViewChild('one') d1:ElementRef;

      constructor(
            private busStopService: BusStopService
      ) { }

      ngOnInit() {
            setInterval(this.retrieveAllBusStops.bind(this), 5000);
      }

      retrieveAllBusStops() {
            this.busStopService.getData(this.recall, function (res) {
                  console.log(res);
                  if (this.busStops.bus_stops.length) {
                        this.busStops.bus_stops.forEach((busStop, index) => {
                              if(busStop.busStopId == res.bus_stops[index].busStopId){
                                    this.busStops.bus_stops[index].nbPersonsWaiting = res.bus_stops[index].nbPersonsWaiting
                                    this.busStops.bus_stops[index].nbPersonsComing = res.bus_stops[index].nbPersonsComing
                              }
                        });
                  } else {
                        this.busStops = res;
                  }

            }.bind(this));
            if (this.recall == false) {
                  this.recall = true;
            }
      }

}
