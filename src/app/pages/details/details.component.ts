import { Component, OnInit, Inject, Renderer2, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BusStopService } from 'src/app/services/bus-stop.service';
import { BusLineService } from 'src/app/services/bus-line.service';
// import { concat } from 'rxjs';
// import { DOCUMENT } from '@angular/common';

@Component({
      selector: 'app-details',
      templateUrl: './details.component.html',
      styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

      private busStops = [];
      private busLines = [];

      private recall = false;
      private interval;
      // @ViewChild('one') d1:ElementRef;

      constructor(
            private busStopService: BusStopService,
            private busLineService : BusLineService
      ) { }

      ngOnInit() {
            // setInterval(this.retrieveAllBusStops.bind(this), 5000);
            this.retrieveAllData();
            this.interval = setInterval(this.retrieveAllData.bind(this), 10000);
      }

      ngOnDestroy(){
            clearInterval(this.interval);
      }

      retrieveAllData(){
            this.busLineService.retrieveAllData(this.recall, function (res) {
                  console.log(res);
                  if (this.busStops.length) {
                        this.busStops.forEach((busStop, index) => {
                              if (busStop.busStopId == res.bus_stops[index].busStopId) {
                                    if (this.busStops[index].nbPersonsWaiting != res.bus_stops[index].nbPersonsWaiting){
                                          this.busStops[index].nbPersonsWaiting = res.bus_stops[index].nbPersonsWaiting
                                          //TODO update circle size
                                    }
                                          
                                    if (this.busStops[index].nbPersonsComing != res.bus_stops[index].nbPersonsComing){
                                          this.busStops[index].nbPersonsComing = res.bus_stops[index].nbPersonsComing
                                          //TODO update circle size
                                    }
                                          
                              }
                        });
                  } else {
                        this.busStops = res.bus_stops;
                  }

                  this.busLines = res.lines;

            }.bind(this));
            if (this.recall == false) {
                  this.recall = true;
            }
      }

}
