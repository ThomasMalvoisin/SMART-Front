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
      //ArretActif
      private nomArretActif: String;
      latitudeActif: number;
      longitudeActif: number;
      personneALArret: number;
      personneArrivant: number;

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
             
            
            

            this.busX = new Array();
            this.busY = new Array();
            this.busX = [45.779886];
            this.busY = [4.882462];
            this.personneBus = new Array();
            this.personneBus = [11];

      }
      ngOnInit() {
            this.nomArretActif = '1';
            this.latitudeActif = 1;
            this.longitudeActif = 1;
            this.personneALArret= 5;
            this.personneArrivant= 1;
            this.retrieveAllBusStops(); 
            this.mymap = L.map('mymap').setView([45.769448, 4.861025], 15);           
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
                              this.circleBusStop[i] = L.circle([busStop.latitude, busStop.longitude] , {
                                    color: 'red',
                                    fillColor: '#f03',
                                    fillOpacity: 0.2,
                                    radius: busStop.nbPersonsWaiting+1
                              }).addTo(this.mymap);
                              this.circleBusStop[i].bindPopup(busStop.name);
                              

                              this.circleBusStop[i].on('click', this.onBusStopSelected.bind(this, busStop));
                              
                  })
                  console.log(res);
            }, err => 
            {
                  console.log(err);
            });
      }

      onBusStopSelected(busStop){
            console.log(busStop);
            this.nomArretActif= busStop.name;
            this.latitudeActif= busStop.latitude;
            this.longitudeActif= busStop.longitude;
            this.personneALArret= busStop.nbPersonsWaiting;
            this.personneArrivant= busStop.nbPersonsComing;
      }
      getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
      }
}