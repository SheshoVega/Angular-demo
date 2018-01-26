import { Component, OnInit } from '@angular/core';

import { Project } from "../../core/models/project";
import { ProjectsService } from '../projects.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";
import { UpdateProjectModalComponent } from '../update-project-modal/update-project-modal.component';


@Component({
	selector: 'app-projects-list',
	templateUrl: './projects-list.component.html',
	styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

	projects: Array<Project>;
	modalDialogRef: MatDialogRef<ModalDialogComponent>;
	updateProjectModal: MatDialogRef<UpdateProjectModalComponent>;
	operation:string;
	showMsg:boolean = false;
	result:boolean;

	constructor(private projectsService: ProjectsService, private dialog: MatDialog) { }

	ngOnInit() {
		this.getProjects();
	}

	showMessages(operation:string){
		this.operation = operation;
		this.showMsg = true;
		setTimeout(()=>{ this.showMsg = false },2500);
	}

	getProjects() {
		this.projectsService.getProjects().subscribe(
			(data: Array<Project>) => {
				this.projects = data;	
			},
			(err: HttpErrorResponse) => {
				this.result = false;			
				this.showMessages('GET');
				if (err.error instanceof Error) {
					console.log('Client-Side error:', err.error.message);
				} else {
					console.log(`Backend error: codigo [ ${err.status} ], error: [ ${err.error} ]`);
				}
			}
		);
	}

	openDeleteDialog(id:string, projectTitle:string){
		console.log('abriendo delete dialog');
		this.modalDialogRef = this.dialog.open(ModalDialogComponent, {
			data: {
				action: 'DELETE',
				label: projectTitle 
			}
		});
		this.modalDialogRef.afterClosed().subscribe(result => {
			if(result === true){
				console.log('aceptando delete');
				this.deleteProject(id);
			} else if(result === false){
				console.log('cancelando delete');
				
			}
		});
	}

	deleteProject(id:string){
		console.log('Eliminando: ',id);
		this.projectsService.deleteProject(id).subscribe(
			(res) => {
				console.log(res);
				this.result = true;			
				this.showMessages('DELETE');
			},
			(err: HttpErrorResponse) => {
				this.result = false;			
				this.showMessages('DELETE');
				if (err.error instanceof Error) {
					console.log('Client-Side error:', err.error.message);
				} else {
					console.log(`Backend error: codigo [ ${err.status} ], error: [ ${err.error} ]`);
				}
			},
			() => {
				this.getProjects();
				console.log("The DELETE observable is now completed.");
			}
		);
		
	}

	openUpdateDialog(project: Project){
		console.log('abriendo update dialog');
		this.updateProjectModal = this.dialog.open(UpdateProjectModalComponent, {
			data: {
				project: project
			}
		});
		this.updateProjectModal.afterClosed().subscribe(result => {
			if(result.error === false && result.cancel === false){
				console.log('aceptando update');
				this.result = true;			
				this.showMessages('UPDATE');
				this.getProjects();
			} else if(result.error === true && result.cancel === false){
				console.log('error update');
				this.result = false;			
				this.showMessages('UPDATE');
			} else {
				console.log('aceptando update');
			}
		});
	}

}
