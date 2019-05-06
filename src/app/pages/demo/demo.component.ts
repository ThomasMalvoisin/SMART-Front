import { Component, OnInit} from '@angular/core';
import { BusStopService } from 'src/app/services/bus-stop.service';
import { DemoService } from 'src/app/services/demo.service';

@Component({
      selector: 'app-demo',
      templateUrl: './demo.component.html',
      styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
      private busStops = {
            bus_stops: []
      };
      
      private nbRequete;
      private busStopsPercents;
      

      constructor(
            private busStopService: BusStopService,
            private demoService: DemoService
      ) { }

      ngOnInit() {
            this.retrieveAllBusStops();
            this.createUtilsArrays();
            var element = document.getElementById('buttonActualiser');

            element.addEventListener('click', this.sendDemo.bind(this));
      }

      retrieveAllBusStops() {
            this.busStops=this.busStopService.retrieveAll();
      }

      createUtilsArrays() {
            this.busStopsPercents = this.busStops.bus_stops.map((busStop => {
                  return {
                        name: busStop.name,
                        id: busStop.id,
                        busStopId: busStop.busStopId,
                        value: 0
                  }
            }))
      }

      sendDemo(){
            this.demoService.sendToBack(this.nbRequete, this.busStopsPercents);
      }







}