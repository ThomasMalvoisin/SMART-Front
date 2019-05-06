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

  addBusStopsToDetails() { // Cette fonction là ne marche pas, je comprends pas pourquoi même avec un truc tout simple
    // var i =1;
    // this.busStops.bus_stops.forEach(busStop => {
    //   var ColapseNum= "collapse" +i;
    //   console.log(ColapseNum);
    //   var card = this.renderer.createElement('div');
    //   this.renderer.setAttribute(card, "class", 'card');
    //   var cardHeader = this.renderer.createElement('div');
    //   this.renderer.setAttribute(cardHeader, 'class', 'card-header');
    //   var titre = this.renderer.createElement('h5');
    //   this.renderer.setAttribute(titre, 'class','mb-0');
    //   var button = this.renderer.createElement('button');
    //   this.renderer.setAttribute(button, 'class','btn');
    //   this.renderer.setAttribute(button, 'type','button');
    //   this.renderer.setAttribute(button, 'data-toggle',"collapse");
    //   this.renderer.setAttribute(button, 'data-target','#'+ColapseNum);
    //   this.renderer.setAttribute(button, "aria-expanded", "true");
    //   this.renderer.setAttribute(button,"aria-controls", ColapseNum);
    //   var text = this.renderer.createText(busStop.name);
    //   this.renderer.appendChild(button, text);
    //   this.renderer.appendChild(titre,button);
    //   this.renderer.appendChild(cardHeader,titre);
    //   this.renderer.appendChild(card,cardHeader);
    //   var collapse = this.renderer.createElement('div');
    //   this.renderer.setAttribute(collapse, 'id', ColapseNum);
    //   this.renderer.setAttribute(collapse,'class', "collapse");
    //   this.renderer.setAttribute(collapse,"aria-labelledby", "headingOne");
    //   this.renderer.setAttribute(collapse,'data-parent',"#accordionExample");
    //   var cardbody=this.renderer.createElement('div');
    //   this.renderer.setAttribute(cardbody, 'class',"card-body");
    //   var retourLigne = this.renderer.createElement('br');
    //   var retourLigne2 = this.renderer.createElement('br');
    //   var text2 = this.renderer.createText("Il y a actuellement "+busStop.nbPersonsWaiting+" personne(s) qui attend(ent) à cet arrêt.");
    //   this.renderer.appendChild(cardbody, text2);
    //   this.renderer.appendChild(cardbody, retourLigne);
    //   var text3 = this.renderer.createText("Prochainement, "+ busStop.nbPersonsComing + " personne(s) arrive(nt) à cet arrêt.");
    //   this.renderer.appendChild(cardbody, text3);
    //   this.renderer.appendChild(cardbody, retourLigne2);
    //   var text4 = this.renderer.createText("L'arrêt est localisé à "+busStop.latitude+" Nord et " +busStop.longitude+" Est." );
    //   this.renderer.appendChild(cardbody, text4);
    //   this.renderer.appendChild(collapse,cardbody);
    //   this.renderer.appendChild(card,collapse);
    //   this.renderer.appendChild(this.d1.nativeElement, card);
    //   i++;
    //   });
      
  }

  retrieveAllBusStops() {
    this.busStops=this.busStopService.retrieveAll();
  }

}
