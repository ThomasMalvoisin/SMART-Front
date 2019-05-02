import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
      providedIn: 'root'
})
export class BusStopService {

      constructor(private http: HttpClient) { }

      retrieveAll() {

            const options = {
                  params: new HttpParams().set("action", "getBusStops")
            };

            return this.http.get(environment.backend + "/OptiBus_Back/ActionServlet", options);
      }
}
