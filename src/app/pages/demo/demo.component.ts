import { Component, OnInit, Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BusStopService } from 'src/app/services/bus-stop.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  private busStops = {
    bus_stops: []
  };
  @ViewChild('one') d1:ElementRef;

  constructor(  @Inject(DOCUMENT) private document: any,
  private busStopService: BusStopService,
  private renderer:Renderer2) { }

  ngOnInit() {
    this.retrieveAllBusStops();
    
  }

  addBusStopsToDetails() { // Cette fonction là ne marche pas, je comprends pas pourquoi même avec un truc tout simple
    var i =1;
    this.busStops.bus_stops.forEach(busStop => {
      var busStopNum= "busStop" +i;
      console.log(busStopNum);
      var div = this.renderer.createElement('div');
      var label = this.renderer.createElement('label');
      this.renderer.setAttribute(label, 'for', busStop.name);
      var text = this.renderer.createText(busStop.name + " : "+" \u00a0");
      this.renderer.appendChild(label, text);
      this.renderer.appendChild(div, label);
      var input = this.renderer.createElement('input');
      this.renderer.setAttribute(input, 'type' , 'number');
      this.renderer.appendChild(div, input);
      this.renderer.appendChild(this.d1.nativeElement, div);
      i++;
      });
      
  }

  retrieveAllBusStops() {
    this.busStopService.retrieveAll().subscribe((res: any) => {
          this.busStops = res;
          console.log(this.busStops);
          this.addBusStopsToDetails();
    }, err => {
          console.log(err);
    });
}

}