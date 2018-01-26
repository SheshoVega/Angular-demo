import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: 'app-modal-dialog',
	templateUrl: './modal-dialog.component.html',
	styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {
	
	action:string = '';
	label:string = '';

	constructor(private dialogRef: MatDialogRef<ModalDialogComponent>, @Inject(MAT_DIALOG_DATA) private data) { }

	ngOnInit() {
		this.label = this.data.label;	
		if(this.data.action === 'CREATE'){
			this.action = 'Crear';
		} else	if(this.data.action === 'DELETE'){
			this.action = 'Eliminar';
		} else if(this.data.action === 'UPDATE'){
			this.action = 'Actualizar';
		}
	}

	accept(){
		this.dialogRef.close(true);
	}

	cancel(){
		this.dialogRef.close(false);
	}

}
