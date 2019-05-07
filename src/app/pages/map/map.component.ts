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
      private ligneSelected;

      private infoBusStopSelected: boolean;
      private infoLigneSelected: boolean;

      //BusLines
      private busLines = {
            lines: []
      };


      constructor(
            private busStopService: BusStopService,
            private busLineService: BusLineService
      ) { }

      ngOnInit() {
            this.infoBusStopSelected = false;
            this.infoLigneSelected = false;
            this.setupMap();
            this.retrieveAllBusStops();
            this.retrieveAllBusLines();
      }

      retrieveAllBusStops() {
            this.busStops = this.busStopService.retrieveAll();
            this.addBusStopsToMap();
      }

      retrieveAllBusLines() {
            this.busLines= this.busLineService.retrieveAll();
            
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
                        color: '#700070',
                        fillColor: '#700070',
                        fillOpacity: 0.2,
                        radius: busStop.nbPersonsWaiting * 2 + 1
                  });

                  // circle.bindPopup(busStop.name);
                  circle.on('click', this.onBusStopSelected.bind(this, busStop));
                  circle.addTo(this.mymap);
            });
            //         var polyline = L.polyline(latlngs, {color: 'red'}).addTo(this.mymap);
            // // zoom the map to the polyline
            // this.mymap.fitBounds(polyline.getBounds());
      }

      addBusLinesToMap() {
            this.busLines.lines.forEach(line => {
                  let latlng = [[]];


                  latlng[0].push([line.departure.latitude, line.departure.longitude]);

                  line.departure.paths[0].path.coordinates.forEach(coord => {
                        latlng[0].push([coord.latitude, coord.longitude]);
                  })

                  latlng[0].push([line.departure.paths[0].busStopDestination.latitude, line.departure.paths[0].busStopDestination.longitude]);

                  line.busStopLines.forEach((busStopLine) => {
                        if (busStopLine.busStop.paths.length) {
                              let ll = [];
                              ll.push([busStopLine.busStop.latitude, busStopLine.busStop.longitude]);

                              busStopLine.busStop.paths[0].path.coordinates.forEach(coord => {
                                    ll.push([coord.latitude, coord.longitude]);
                              })

                              ll.push([busStopLine.busStop.paths[0].busStopDestination.latitude, busStopLine.busStop.paths[0].busStopDestination.longitude])
                        
                              latlng.push(ll);
                        }
                  })


                  var polyline = L.polyline(latlng, {color: 'red'}).addTo(this.mymap);
                  polyline.on('click', this.onBusSelected.bind(this, line));


            })
      }

      onBusSelected(line){
            this.infoBusStopSelected = false;
            this.infoLigneSelected = true;
            this.ligneSelected = line;
            console.log(line);

      }

      onBusStopSelected(busStop) {
            this.infoBusStopSelected = true;
            this.infoLigneSelected = false;
            this.busStopSelected = busStop;
      }

      getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
      }
}