import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";

import { ProjectsService } from '../projects.service';
import { Project } from '../../core/models/project';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-update-project-modal',
	templateUrl: './update-project-modal.component.html',
	styleUrls: ['./update-project-modal.component.scss']
})
export class UpdateProjectModalComponent implements OnInit {

	toUpdate:string = 'UPDATE';
	modalDialogRef: MatDialogRef<ModalDialogComponent>;
	project:Project;
	newDataProject: Project;
	btnDisabled:  boolean;
	operation:string;
	showMsg:boolean = false;
	result:boolean;

	constructor(private dialogRef: MatDialogRef<UpdateProjectModalComponent>, @Inject(MAT_DIALOG_DATA) private data, private projectsService: ProjectsService, private dialog: MatDialog) { }

	ngOnInit() {
		this.btnDisabled = true;
		this.project = this.data.project;
	}

	showMessages(operation:string){
		this.operation = operation;
		this.showMsg = true;
		setTimeout(()=>{ this.showMsg = false },2500);
	}

	getNewDataProject(data:any){
		console.log('La data recibida: ', data);
		
		if(data.valid){
			this.btnDisabled = false;
			this.newDataProject = data.project;
		}else{
			this.btnDisabled = true;
		}
	}

	accept(){
		this.modalDialogRef = this.dialog.open(ModalDialogComponent, {
			data: {
				action: 'UPDATE',
				label: this.newDataProject.title
			}
		});
		this.modalDialogRef.afterClosed().subscribe(result => {
			if(result === true){
				console.log('aceptando la actualizacion del proyecto');
				this.updateProject(this.newDataProject);
				
			} else if(result === false){
				console.log('cancelando la actualizacion del proyecto');
				
			}
		});
	}

	cancel(){
		this.dialogRef.close({ error: false, cancel: true });
	}

	updateProject(newDataProject:Project){
		this.projectsService.updateProject(newDataProject).subscribe(
			(res) => {
				console.log(res);
				this.dialogRef.close({ error: false, cancel: false });
			},
			(err: HttpErrorResponse) => {
				this.result = false;			
				this.showMessages('UPDATE');
				if (err.error instanceof Error) {
					console.log('Client-Side error:', err.error.message);
				} else {
					console.log(`Backend error: codigo [ ${err.status} ], error: [ ${err.error} ]`);
				}
			},
			() => {
				console.log("The UPDATE observable is now completed.");
			}
		);
	}
}
