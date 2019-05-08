import { Component, OnInit } from '@angular/core';
import { BusStopService } from 'src/app/services/bus-stop.service';
import { DemoService } from 'src/app/services/demo.service';
import { BusLineService } from 'src/app/services/bus-line.service';

@Component({
      selector: 'app-demo',
      templateUrl: './demo.component.html',
      styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
      private busStops = [];

      private nbRequete;
      private busStopsPercents;

      constructor(
            private busStopService: BusStopService,
            private busLineService: BusLineService,
            private demoService: DemoService
      ) { }

      ngOnInit() {
            // this.retrieveAllBusStops();
            this.retrieveAllData();
            this.createUtilsArrays();
      }

      // retrieveAllBusStops() {
      //       this.busStops=this.busStopService.retrieveAll();
      // }

      retrieveAllData() {
            this.busLineService.retrieveAllData(false, function (res) {
                  console.log(res);
                  this.busStops = res.bus_stops;
                  this.createUtilsArrays();
            }.bind(this));
      }

      createUtilsArrays() {
            this.busStopsPercents = this.busStops.map((busStop => {
                  return {
                        name: busStop.name,
                        id: busStop.id,
                        busStopId: busStop.busStopId,
                        value: 0
                  }
            }))
      }

      sendDemo() {
            console.log("suuu");
            // this.demoService.sendToBack(this.nbRequete, this.busStopsPercents);
      }







}