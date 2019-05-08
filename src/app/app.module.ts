import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { appRoutes } from './app.routes';

//Components & pages
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapComponent } from './pages/map/map.component';
import { DetailsComponent } from './pages/details/details.component';
import { DemoComponent } from './pages/demo/demo.component';
import { DetailsLignesComponent } from './pages/details-lignes/details-lignes.component';

import {FormsModule} from '@angular/Forms';
import { ParametresComponent } from './pages/parametres/parametres.component';

@NgModule({
      declarations: [
            AppComponent,
            DashboardComponent,
            MapComponent,
            DetailsComponent,
            ParametresComponent,
            DemoComponent,
            DetailsLignesComponent,
            ParametresComponent
      ],
      imports: [
            BrowserModule,
            HttpClientModule,
            appRoutes,
            FormsModule
      ],
      providers: [],
      bootstrap: [AppComponent]
})
export class AppModule { }
