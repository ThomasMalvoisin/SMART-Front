import { Component, OnInit } from '@angular/core';
import { DemoService } from 'src/app/services/demo.service';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss']
})
export class ParametresComponent implements OnInit {

  private nbRequeteMax: number;
  private tempsMax: number;
  private nomBus;
  private placeBus: number;

  constructor(private demoService: DemoService) { }

  ngOnInit() {

    var buttonAlgo = document.getElementById('AppliquerParam');
    buttonAlgo.addEventListener('click', this.sendParamAlgo.bind(this));

    var buttonBus = document.getElementById('AjouterBus');
    buttonBus.addEventListener('click', this.sendNewBus.bind(this));
  }

  sendParamAlgo(){
      this.demoService.sendParamAlgo(this.nbRequeteMax , this.tempsMax );
      
  }

  sendNewBus(){
    this.demoService.sendNewBus(this.nomBus,this.placeBus);
  }

}
