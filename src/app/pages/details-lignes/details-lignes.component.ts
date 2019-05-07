import { Component, OnInit } from '@angular/core';
import { BusLineService } from 'src/app/services/bus-line.service';

@Component({
  selector: 'app-details-lignes',
  templateUrl: './details-lignes.component.html',
  styleUrls: ['./details-lignes.component.scss']
})
export class DetailsLignesComponent implements OnInit {

  private busLines: [];

  constructor(private busLineService: BusLineService) { }

  ngOnInit() {
    this.retrieveAllBusLines();
  }

  retrieveAllBusLines() {
    this.busLines=this.busLineService.retrieveAll();
    console.log(this.busLines);
  }

}
