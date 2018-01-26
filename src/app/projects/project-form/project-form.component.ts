import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Project } from '../../core/models/project';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import "rxjs/add/operator/debounceTime";
import { ProjectsService } from '../projects.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnDestroy {
	
	resultSub:Subscription;
	@Input() operation:string;
	@Input() projectData:any;
	@Input() result:boolean;
	@Output() dataProject = new EventEmitter<any>();
	projectForm: FormGroup;
	tecnologies: Array<string> = [];
	selectable: boolean = true;
	removable: boolean = true;
	addOnBlur: boolean = true;
	showWarning:boolean = false;
	separatorKeysCodes = [ENTER, COMMA];// Enter, comma

	constructor(private formBuilder: FormBuilder, private projectsService: ProjectsService) { }

	ngOnInit() {
		this.resultSub = this.projectsService.getOperationResult().subscribe(result => {
			if(result){
				console.log('Limpiando formulario!');				
				this.projectForm.reset();
				this.tecnologies = [];
				this.projectsService.setOperationResult(false);
			}
		});

		this.projectForm = this.formBuilder.group({
			title: ['', Validators.required],
			type: ['', Validators.required],
			state: ['', Validators.required],
			product: ['', Validators.required]
		});

		this.projectForm.valueChanges.debounceTime(500).subscribe(val => {
			this.sendData();
		});

		if(this.operation === 'CREATE'){
			console.log('se va a crear un proyecto');
		
		} else if(this.operation === 'UPDATE'){
			console.log('se va a actualizar un proyecto');
			console.log('proyecto:', this.projectData);
			console.log('llego:', this.projectData._id);

			this.projectForm.setValue({
				title: this.projectData.title,
				type: this.projectData.type,
				state: this.projectData.state, 
				product: this.projectData.product
			});

			this.projectForm.addControl('_id', this.formBuilder.control(this.projectData._id, Validators.required) );
			console.log('New formGroup: ', this.projectForm.value);
			
			this.tecnologies = this.projectData.tecnologies;
		}		

	}

	ngOnDestroy() {
		this.resultSub.unsubscribe();
	}

	sendData() {
		let data = {
			valid: (this.projectForm.valid && this.tecnologies.length > 0),
			project: (<any>Object).assign({}, this.projectForm.value, {	tecnologies: this.tecnologies })
		};
		this.dataProject.emit(data);
	}

	add(event: MatChipInputEvent): void {
		let input = event.input;
		let value = event.value;

		// // agregar tecnologia
		if ((value || '').trim()) {
			this.tecnologies.push(value);
		}

		// Reset el value del input 
		if (input) {
			input.value = '';
		}

		this.showWarning = false;
		this.sendData();
	}

	remove(technolgy: string): void {
		let index = this.tecnologies.indexOf(technolgy);

		if (index >= 0) {
			this.tecnologies.splice(index, 1);
		}
		// console.log('Tecnologias: ', this.tecnologies);

		if (this.tecnologies.length === 0) {
			this.showWarning = true;
		}

		this.sendData();
		
	}

}
