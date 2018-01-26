import { Route } from "@angular/router";

import { DashboardComponent } from "./core/dashboard/dashboard.component";
import { HomeComponent } from "./core/home/home.component";


export const routes: Route[] = [
    { path: '', component: DashboardComponent, outlet: 'dashboard' },
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent }
];