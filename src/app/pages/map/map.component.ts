import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { BusStopService } from 'src/app/services/bus-stop.service';
import { BusLineService } from 'src/app/services/bus-line.service';
// import * as Gp from './../../../../node_modules/geoportal-access-lib/dist/GpServices.js';

@Component({

      selector: 'app-map',
      templateUrl: './map.component.html',
      styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
      //Map
      private mymap;

      //BusStops
      private busStops = {
            bus_stops: []
      };
      private busStopSelected;

      //BusLines
      private busLines;
      private busLineSelected;

      constructor(
            private busStopService: BusStopService,
            private busLineService: BusLineService
      ) { }

      ngOnInit() {
            this.setupMap();
            this.retrieveAllBusStops();
            this.retrieveAllBusLines();
      }

      retrieveAllBusStops() {
            this.busStops=this.busStopService.retrieveAll();
            this.addBusStopsToMap();
      }

      retrieveAllBusLines() {
            this.busLines = this.busLineService.retrieveAll();
            this.addBusLinesToMap();
      }

      setupMap() {
            this.mymap = L.map('mymap').setView([45.769448, 4.861025], 15);
            L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.mymap);
      }

      addBusStopsToMap() {
            this.busStops.bus_stops.forEach(busStop => {
                  let circle = L.circle([busStop.latitude, busStop.longitude], {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.2,
                        radius: busStop.nbPersonsWaiting + 1
                  });

                  circle.bindPopup(busStop.name);
                  circle.on('click', this.onBusStopSelected.bind(this, busStop));
                  circle.addTo(this.mymap);
            });
      }

      addBusLinesToMap() {
            
      }

      onBusStopSelected(busStop) {
            this.busStopSelected = busStop;
      }

      onBusLineSelected() {

      }

      getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
      }
}