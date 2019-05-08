import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { BusStopService } from 'src/app/services/bus-stop.service';
import { BusLineService } from 'src/app/services/bus-line.service';
// import * as Gp from './../../../../node_modules/geoportal-access-lib/dist/GpServices.js';

@Component({

      selector: 'app-map',
      templateUrl: './map.component.html',
      styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
      //Map
      private mymap;

      //BusStops
      private busStops = [];
      private busStopSelected;
      private infoBusStopSelected: boolean;
      private circles = [];


      //BusLines
      private busLines = []
      private ligneSelected;
      private infoLigneSelected: boolean;
      private polylines = [];

      private recall = false;
      private interval;

      constructor(
            private busStopService: BusStopService,
            private busLineService: BusLineService
      ) { }

      ngOnInit() {
            this.infoBusStopSelected = false;
            this.infoLigneSelected = false;
            this.setupMap();
            // this.retrieveAllBusStops();
            // this.retrieveAllBusLines();
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
                                          this.busStops[index].nbPersonsWaiting = res.bus_stops[index].nbPersonsWaiting;
                                          this.circles[index].setRadius(res.bus_stops[index].nbPersonsWaiting*2 +1 );
                                          console.log("map: update circle size");
                                          console.log(res.bus_stops[index].nbPersonsWaiting*2 +1 );
                                          console.log(busStop.name);
                                    }
                                          
                                    if (this.busStops[index].nbPersonsComing != res.bus_stops[index].nbPersonsComing){
                                          this.busStops[index].nbPersonsComing = res.bus_stops[index].nbPersonsComing
                                          //TODO update circle size
                                    }
                                          
                              }
                        });
                  } else {
                        this.busStops = res.bus_stops;
                        this.addBusStopsToMap();
                  }

                  this.removeBusLines();
                  this.busLines = res.lines;
                  this.addBusLinesToMap();
      

            }.bind(this));
            if (this.recall == false) {
                  this.recall = true;
            }
      }

      setupMap() {
            this.mymap = L.map('mymap').setView([45.769448, 4.861025], 15);
            L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.mymap);
      }

      addBusStopsToMap() {
            this.busStops.forEach((busStop, index) => {
                  let circle = L.circle([busStop.latitude, busStop.longitude], {
                        color: '#700070',
                        fillColor: '#700070',
                        fillOpacity: 0.2,
                        radius: busStop.nbPersonsWaiting * 2 + 1
                  });
                  this.circles.push(circle);
                  this.circles[index].on('click', this.onBusStopSelected.bind(this, busStop));
                  this.circles[index].addTo(this.mymap);
            });
      }

      addBusLinesToMap() {
            this.busLines.forEach((line, index) => {
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

                  let nb = 3;

                  let color = "hsl(" + index*52 + ",83.9%,26.9%)";
                  
                  var polyline = L.polyline(latlng, { color: color }).addTo(this.mymap);
                  this.polylines.push(polyline);
                  this.polylines[index].on('click', this.onBusSelected.bind(this, line));
            })
      }

      removeBusLines(){
            this.polylines.forEach(polyline => {
                  polyline.remove();
            })
      }

      onBusSelected(line) {
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