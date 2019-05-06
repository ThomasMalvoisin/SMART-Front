import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'leaflet';
import { MapComponent } from '../pages/map/map.component';

@Injectable({
      providedIn: 'root'
})
export class BusStopService {

      private busStops = {
            bus_stops: []
          };

      constructor(private http: HttpClient) { }

      initBuStop() {

            const options = {
                  params: new HttpParams().set("action", "getBusStops")
            };

            this.http.get(environment.backend + "/OptiBus_Back/ActionServlet", options).subscribe((res: any) => {
                  this.busStops = res;
                  console.log(this.busStops);

            }, err => {
                  console.log(err);
            });
      }

      retrieveAll(){
            return this.busStops;
      }
      
}
