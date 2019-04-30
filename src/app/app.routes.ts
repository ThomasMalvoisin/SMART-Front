import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core"

//Pages
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {MapComponent} from './pages/map/map.component';
import {DemoComponent} from './pages/demo/demo.component';
import {DetailsComponent} from './pages/details/details.component';
import {ResourcesComponent} from './pages/resources/resources.component';



export const ROUTES: Routes = [
      {
            component: DashboardComponent,
            path: 'dashboard'
      },
      {
            component: MapComponent,
            path: 'map'
      },
      {
            component: DemoComponent,
            path: 'demo'
      },
      {
            component: ResourcesComponent,
            path: 'resources'
      },
      {
            component: DetailsComponent,
            path: 'details'
      },
      {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
      },
      {
            path: '**',
            redirectTo: 'dashboard'
      }
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(ROUTES, { enableTracing: false });