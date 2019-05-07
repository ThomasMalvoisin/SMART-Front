import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
      providedIn: 'root'
})
export class BusStopService {

      onGetBusStops : EventEmitter<any> = new EventEmitter<any>();

      private busStops = {
            bus_stops: []
          };

      constructor(private http: HttpClient) { 
      }

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

      getData(recall, callback){
            if(!recall && this.busStops.bus_stops.length){
                  callback(this.busStops);
            } else {
                  const options = {
                        params: new HttpParams().set("action", "getBusStops")
                  };
      
                  this.http.get(environment.backend + "/OptiBus_Back/ActionServlet", options).subscribe((res: any) => {
                        // this.busStops = res;
                        // console.log(this.busStops);
                        this.busStops = res;
                        // this.onGetBusStops.emit(res);
                        callback(this.busStops);
                  }, err => {
                        console.log(err);
                  });
            }
            
      }
      
}
