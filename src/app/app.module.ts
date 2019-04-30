import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { appRoutes } from './app.routes';

//Components & pages
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapComponent } from './pages/map/map.component';
import { DetailsComponent } from './pages/details/details.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { DemoComponent } from './pages/demo/demo.component';

@NgModule({
      declarations: [
            AppComponent,
            DashboardComponent,
            MapComponent,
            DetailsComponent,
            ResourcesComponent,
            DemoComponent
      ],
      imports: [
            BrowserModule,
            appRoutes
      ],
      providers: [],
      bootstrap: [AppComponent]
})
export class AppModule { }
