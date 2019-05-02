import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }
  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const mymap = L.map('mymap').setView([45.7537, 4.8630], 13);


    L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);

    
    
  var circle = L.circle([45.774326, 4.868297], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 20
  }).addTo(mymap);

  circle.bindPopup("Place Witson");

  circle.on('click', function(){
    console.log("test");
  })
  

  

  }
  }