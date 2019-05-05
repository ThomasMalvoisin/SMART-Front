import { Component, OnInit} from '@angular/core';
import { BusStopService } from 'src/app/services/bus-stop.service';

@Component({
      selector: 'app-demo',
      templateUrl: './demo.component.html',
      styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
      private busStops = {
            bus_stops: []
      };

      private hours;
      private busStopsPercents;

      constructor(
            private busStopService: BusStopService
      ) { }

      ngOnInit() {
            this.retrieveAllBusStops();
      }

      retrieveAllBusStops() {
            this.busStopService.retrieveAll().subscribe((res: any) => {
                  this.busStops = res;
                  // console.log(this.busStops);
                  // this.addBusStopsToDetails();
                  this.createUtilsArrays();
            }, err => {
                  console.log(err);
            });
      }

      createUtilsArrays() {
            this.hours = Array.from(Array(24).keys()).map((hour) => {
                  return {
                        beginH: hour,
                        endH: (hour + 1) % 24,
                        nb: 0
                  }
            })

            this.busStopsPercents = this.busStops.bus_stops.map((busStop => {
                  return {
                        name: busStop.name,
                        id: busStop.id,
                        busStopId: busStop.busStopId,
                        value: 0
                  }
            }))
      }

}