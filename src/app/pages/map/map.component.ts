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

      private busStops;

      nombredePersonneArret: number[];
      arretX: number[]; //Absicce des arrets de bus
      arretY: number[]; //Ordonnée des arrets de bus
      nom: string[]; //Nom des arret de bus
      busX: number[]; //Absicce des bus
      busY: number[]; //Ordonnée des bus
      personneBus: number[]; //nombre de personne dans le bus



      constructor(
            private busStopService : BusStopService
      ) {
            // var request = new XMLHttpRequest();
            // request.open('GET', 'C:/Users/Samuel/Documents/bus.json', false);
            // request.responseType = 'json';
            // request.send(null);
            // var response = JSON.parse(request.responseText);
            // console.log(request.responseText);
            // return this.http.post('http://localhost:8080/article', body, options)
            //             .map(response => response.json())
            //             .catch(this.handleError);


            this.nombredePersonneArret = new Array();
            this.nombredePersonneArret = [24, 100, 8];
            this.arretX = new Array();
            this.arretY = new Array();
            this.arretX = [45.774326, 45.770780, 45.782496];
            this.arretY = [4.868297, 4.863535, 4.878191];
            this.nom = new Array();
            this.nom = ['Place Witson', 'Charpennes', 'INSA Einstein']

            this.busX = new Array();
            this.busY = new Array();
            this.busX = [45.779886];
            this.busY = [4.882462];
            this.personneBus = new Array();
            this.personneBus = [11];

      }
      ngOnInit() {

            this.retrieveAllBusStops();
            // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
            const mymap = L.map('mymap').setView([45.7537, 4.8630], 13);

            L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mymap);

            var tabCircle = new Array();
            var i = 0;
            this.nom.forEach(element => {
                  tabCircle[i] = L.circle([this.arretX[i], this.arretY[i]], {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.5,
                        radius: this.nombredePersonneArret[i]
                  }).addTo(mymap);
                  tabCircle[i].bindPopup(this.nom[i]);
                  i++;

            });


            var bounds = new Array();

            var tabBus = new Array();
            var i = 0;
            this.busX.forEach(element => {
                  bounds = [[this.busX[i] - 0.0001, this.busY[i] - 0.0005], [this.busX[i] + 0.0001, this.busY[i] + 0.0005]];
                  tabBus[i] = L.rectangle(bounds, { color: "#f03", weight: 1 }).addTo(mymap);

                  i++;
                  tabBus[i].bindPopup('Bus numéro ' + i);
            });
            // var circle = L.circle([45.774326, 4.868297], {
            //     color: 'red',
            //     fillColor: '#f03',
            //     fillOpacity: 0.5,
            //     radius: this.nombredePersonneArret[0]
            // }).addTo(mymap);

            // circle.bindPopup("Place Witson");

            // circle.on('click', function(){
            //   console.log("test");
            // })
            try {
                  var resultDiv = document.getElementById("result");
                  var avoidFeatures = [];
                  // Gp.Services.route({
                  //   startPoint: {
                  //     x: 45.774326,
                  //     y: 4.868297
                  //   },
                  //   endPoint: {
                  //     x: 45.770780,
                  //     y: 4.863535
                  //   },
                  //   viaPoints: [{
                  //     x: 45.770780,
                  //     y: 4.863535
                  //   }],
                  //   avoidFeature: avoidFeatures,
                  //   apiKey: "yncjnh4m7vkxs9nhw8axql2b",
                  //   onSuccess: function(result) {
                  //     resultDiv.innerHTML = "<p>" + JSON.stringify(result) + "</p>";
                  //     // affichage sur la carte
                  //     L.geoJSON(result.routeGeometry).addTo(mymap);
                  //   },
                  //   onFailure: function(error) {
                  //     resultDiv.innerHTML = "<p>" + error + "</p>";
                  //   }
                  // });
            } catch (e) {
                  resultDiv.innerHTML = "<p>" + e + "</p>"
            }


      }

      retrieveAllBusStops(){
            this.busStopService.retrieveAll().subscribe(res => {
                  this.busStops = res;
                  console.log(res);
            }, err => {
                  // this.toastr.error("Error on loading competition list", "Competitions error");
                  console.log(err);
            });
      }
}