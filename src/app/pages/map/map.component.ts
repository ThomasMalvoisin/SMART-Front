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

      private infoSelected: boolean;

      //BusLines
      private busLines = {
            lines: []
      };
      private busLineSelected;

      constructor(
            private busStopService: BusStopService,
            private busLineService: BusLineService
      ) { }

      ngOnInit() {
            this.infoSelected = false;
            this.setupMap();
            this.retrieveAllBusStops();
            this.retrieveAllBusLines();
      }

      retrieveAllBusStops() {
            // this.busStops = this.busStopService.retrieveAll();
            // this.busStopService.onGetBusStops.subscribe((res) => {
            //       console.log("Suuuuu : ", res);
            // })
            this.busStopService.getData(function (res) {
                  console.log(res);
                  this.busStops = res;
                  this.addBusStopsToMap();
            }.bind(this));
      }

      retrieveAllBusLines() {
            this.busLineService.retrieveAll().subscribe((res: any) => {
                  console.log(res);
                  this.busLines = res;
                  console.log(this.busLines);
                  this.addBusLinesToMap();
            }, err => {
                  console.log(err);
            })
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

                  console.log(latlng);

                  var polyline = L.polyline(latlng, { color: 'red' }).addTo(this.mymap);

            })
      }

      onBusStopSelected(busStop) {
            this.infoSelected = true;
            this.busStopSelected = busStop;
      }

      onBusLineSelected() {

      }

      getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
      }
}