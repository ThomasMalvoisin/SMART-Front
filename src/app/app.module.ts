import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { appRoutes } from './app.routes';

//Components & pages
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapComponent } from './pages/map/map.component';

@NgModule({
      declarations: [
            AppComponent,
            DashboardComponent,
            MapComponent
      ],
      imports: [
            BrowserModule,
            appRoutes
      ],
      providers: [],
      bootstrap: [AppComponent]
})
export class AppModule { }
