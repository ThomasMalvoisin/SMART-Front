import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
      providedIn: 'root'
})
export class BusLineService {

      constructor(private http: HttpClient) { }

      retrieveAll() {

            return {
                  coords: [
                        {
                              longitude: 45.77087,
                              latitude: 4.863733
                        },
                        {
                              longitude: 45.770932,
                              latitude: 4.86383
                        },
                        {
                              longitude: 45.771007,
                              latitude: 4.863958
                        }
                  ]
            }

      }

}
