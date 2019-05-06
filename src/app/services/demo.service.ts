import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http: HttpClient) { }

  sendToBack(nbRequete, busStopsPercents){ //A tester plus tard
      var total = 0;
      busStopsPercents.forEach(busStop => {
          total+=busStop.value;
      });
        busStopsPercents.forEach(busStop => {
          busStop.value=busStop.value/total ;
      });
      var body = {
        simulation:{
          nombre: nbRequete,
          busStopRatio: []
          
        }
        }
        body.simulation.busStopRatio = new Array();
      busStopsPercents.forEach(busStop => {
        var busStopRatio= {
          busStop: busStop.id,
          frequency: busStop.value
        }
        body.simulation.busStopRatio.push(busStopRatio);
      });

      this.http.post(environment.backend + "/OptiBus_Back/ActionServlet", body);
      console.log(body);

    
  }
}
