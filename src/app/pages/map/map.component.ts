import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { BusStopService } from 'src/app/services/bus-stop.service';
// import * as Gp from './../../../../node_modules/geoportal-access-lib/dist/GpServices.js';

@Component({
      
      selector: 'app-map',
      templateUrl: './map.component.html',
      styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

      private busStops = {
            bus_stops: []
      };
      
      busX: number[]; //Absicce des bus
      busY: number[]; //Ordonnée des bus
      personneBus: number[]; //nombre de personne dans le bus
      circleBusStop: any[];
      mymap: any;
      private infoBusStop: any[];
      busArret: any[];
      
      constructor(
            private busStopService : BusStopService
      ) {
            this.infoBusStop=new Array()
            var i=0;
            for(i;i<100;i++){
            this.infoBusStop[i] = new Array();
            }

            this.busArret =new Array();

            this.circleBusStop = new Array();
            this.retrieveAllBusStops();  
            
            

            this.busX = new Array();
            this.busY = new Array();
            this.busX = [45.779886];
            this.busY = [4.882462];
            this.personneBus = new Array();
            this.personneBus = [11];

      }
      ngOnInit() {
            this.mymap = L.map('mymap').setView([45.7537, 4.8630], 13);           
            L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.mymap);
      }

      retrieveAllBusStops()
      {
            this.busStopService.retrieveAll().subscribe( (res:any) => 
            {
                  this.busStops = res;
                  var i =0
                  this.busStops.bus_stops.forEach(busStop => 
                  {
                  this.infoBusStop[i][0]=busStop.name;
                              this.infoBusStop[i][1]=getRandomInt(60); //nombre de personne a larret
                              this.infoBusStop[i][2]='8h34';
                              this.infoBusStop[i][3]='9';
                              this.infoBusStop[i][4]='10h04';
                              this.infoBusStop[i][5]='6';
                              this.infoBusStop[i][6]='14h24';
                              this.infoBusStop[i][7]='11';
                              this.infoBusStop[i][8]='15h29';
                              this.infoBusStop[i][9]='2';
                              this.infoBusStop[i][10]=-1;//pour la fin du tableau
                             

                              this.circleBusStop[i] = L.circle([busStop.longitude, busStop.latitude] , {
                                    color: 'red',
                                    fillColor: '#f03',
                                    fillOpacity: 0.5,
                                    radius: this.infoBusStop[i][1]
                              }).addTo(this.mymap);
                              this.circleBusStop[i].bindPopup(busStop.name);
                              

                              this.circleBusStop[i].on('click', busStopDetails(i]));
                              i++;
                              
                  }
                  console.log(res);
            }, err => 
            {
                  console.log(err);
            });
      }
      function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
      }
      function busStopDetails(a) {
            
      }
}