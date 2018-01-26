import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProjectComponent } from "./create-project/create-project.component";
import { ProjectsListComponent } from "./projects-list/projects-list.component";
import { ProjectsDetailsComponent } from "./projects-details/projects-details.component";

const routes: Routes = [
	{
		path: 'projects', 
		children: [
			{ path: 'create', component: CreateProjectComponent },
			{ path: 'list', component: ProjectsListComponent },
			{ path: ':id', component: ProjectsDetailsComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProjectsRoutingModule { }
