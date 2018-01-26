import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from "./shared/shared.module";
import { ProjectsModule } from "./projects/projects.module";

import { AppComponent } from './app.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { HomeComponent } from './core/home/home.component';

import { routes } from "./app.routes";


@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		SharedModule,
		ProjectsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
