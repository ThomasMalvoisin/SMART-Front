import { Component, OnInit } from '@angular/core';
import { BusLineService } from 'src/app/services/bus-line.service';

@Component({
  selector: 'app-details-lignes',
  templateUrl: './details-lignes.component.html',
  styleUrls: ['./details-lignes.component.scss']
})
export class DetailsLignesComponent implements OnInit {

  private busLines: [];

  private recall = false;
  private interval;

  constructor(private busLineService: BusLineService) { }

  ngOnInit() {
    this.retrieveAllData();
    this.interval = setInterval(this.retrieveAllData.bind(this), 10000);
  }

  ngOnDestroy(){
    clearInterval(this.interval);
}

  retrieveAllData(){
    this.busLineService.retrieveAllData(this.recall, function (res) {
          console.log(res.lines)
          this.busLines = res.lines;
    }.bind(this));
    if (this.recall == false) {
          this.recall = true;
    }
}

}
