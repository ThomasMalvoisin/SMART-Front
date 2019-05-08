import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
      providedIn: 'root'
})
export class DemoService {

      constructor(private http: HttpClient) { }

      sendToBack(nbRequete, busStopsPercents) { //A tester plus tard
            var total = 0;
            busStopsPercents.forEach(busStop => {
                  total += busStop.value;
            });
            busStopsPercents.forEach(busStop => {
                  busStop.value = busStop.value / total;
            });
            var body = {
                  simulation: {
                        number: nbRequete,
                        busStopRatio: []

                  }
            }
            body.simulation.busStopRatio = new Array();
            busStopsPercents.forEach(busStop => {
                  var busStopRatio = {
                        busStop: busStop.id,
                        frequency: busStop.value
                  }
                  body.simulation.busStopRatio.push(busStopRatio);
            });

            const options = {
                  params: new HttpParams().set("action", "startSimulation")
            };

            console.log(JSON.stringify(body));
            return this.http.post(environment.backend + "/OptiBus_Back/ActionServlet", body, options);
      }


      sendNewBus(nomBus: String,placeBus:number){ // Attention body a changer
            const options = {
                  params: new HttpParams().set("action", "createBus")
            };
            var body = {
                  nom: nomBus,
                  place: placeBus
                  }
            console.log("demo.service: this.sendNewBus()");
            console.log(body);
            this.http.post(environment.backend + "/OptiBus_Back/ActionServlet", body, options);

      }

      sendParamAlgo(nbRequeteMax: number , tempsMax: number){ // Attention body et action a changer
            const options = {
                  params: new HttpParams().set("action", "********")
            };
            var body = {
                  requete: nbRequeteMax,
                  temps: tempsMax
                  }
            console.log("demo.service: this.sendParamAlgo()");
            console.log(body);
            this.http.post(environment.backend + "/OptiBus_Back/ActionServlet", body, options);

      }

      stopDemo(){
            const options = {
                  params: new HttpParams().set("action", "stopSimulation")
            };

            return this.http.get(environment.backend + "/OptiBus_Back/ActionServlet", options);
      }
}
