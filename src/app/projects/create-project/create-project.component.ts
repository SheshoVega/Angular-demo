import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material";
import { Project } from '../../core/models/project';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ProjectsService } from '../projects.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-create-project',
	templateUrl: './create-project.component.html',
	styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
	toCreate:string = 'CREATE';
	project: Project;
	modalDialogRef: MatDialogRef<ModalDialogComponent>;
	btnDisabled:  boolean;
	operation:string;
	showMsg:boolean = false;
	result:boolean;

	constructor(private dialog: MatDialog, private projectsService: ProjectsService) { }

	ngOnInit() {
		this.btnDisabled = true;
	}

	showMessages(operation:string){
		this.operation = operation;
		this.showMsg = true;
		setTimeout(()=>{ this.showMsg = false },2500);
	}

	openCreateDialog(){		
		this.modalDialogRef = this.dialog.open(ModalDialogComponent, {
			data: {
				action: 'CREATE',
				label: this.project.title 
			}
		});
		this.modalDialogRef.afterClosed().subscribe(result => {
			if(result === true){
				console.log('aceptando create');
				this.createProject(this.project);
			} else if(result === false){
				console.log('cancelando create');				
			}
		});
	}

	getDataProject(data:any){
		console.log('La data recibida: ', data);		
		if(data.valid){
			this.btnDisabled = false;
			this.project = data.project;
		}else{
			this.btnDisabled = true;
		}
	}

	createProject(project:Project){
		this.projectsService.createProject(project).subscribe(
			(res) => {
				console.log('Id del nuevo proyecto: ',res);
				this.projectsService.setOperationResult(true);
				this.result = true;			
				this.showMessages('CREATE');
			},
			(err: HttpErrorResponse) => {
				this.result = false;			
				this.showMessages('CREATE');
				if (err.error instanceof Error) {
					console.log('Client-Side error:', err.error.message);
				} else {
					console.log(`Backend error: codigo [ ${err.status} ], error: [ ${err.error} ]`);
				}
			},
			() => {
				console.log("The CREATE observable is now completed.");
			}
		);
	}

}
