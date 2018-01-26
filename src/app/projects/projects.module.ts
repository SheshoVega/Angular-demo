import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "../shared/shared.module";

import { ProjectsRoutingModule } from './projects-routing.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsDetailsComponent } from './projects-details/projects-details.component';
import { ProjectsService } from './projects.service';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { UpdateProjectModalComponent } from './update-project-modal/update-project-modal.component';
import { ProjectFormComponent } from './project-form/project-form.component';

@NgModule({
	imports: [
		CommonModule,
		ProjectsRoutingModule,
		SharedModule
	],
	declarations: [
		CreateProjectComponent, 
		ProjectsListComponent, 
		ProjectsDetailsComponent, ModalDialogComponent, UpdateProjectModalComponent, ProjectFormComponent
	],
	entryComponents: [
		ModalDialogComponent,
		UpdateProjectModalComponent
	],
	providers: [
		ProjectsService
	]
})
export class ProjectsModule { }
