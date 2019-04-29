import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core"

//Pages
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {MapComponent} from './pages/map/map.component';

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