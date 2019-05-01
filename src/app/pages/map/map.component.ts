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


    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    }).addTo(mymap);

    
    
    var circle = L.circle([45.774326, 4.868297], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 200
  }).addTo(mymap);

  circle.bindPopup("Lio est le + bô");
  
  

  }
  }