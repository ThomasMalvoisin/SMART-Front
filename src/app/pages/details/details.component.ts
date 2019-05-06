import { Component, OnInit, Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { BusStopService } from 'src/app/services/bus-stop.service';
// import { concat } from 'rxjs';
// import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private busStops = {
    bus_stops: []
  };
  // @ViewChild('one') d1:ElementRef;

  constructor(
    private busStopService: BusStopService
    // private renderer:Renderer2
    ) { 
    
  }

  ngOnInit() {
    this.retrieveAllBusStops();
    
  }

  retrieveAllBusStops() {
    this.busStops=this.busStopService.retrieveAll();
  }

}
