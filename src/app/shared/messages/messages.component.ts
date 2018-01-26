import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

	@Input() operation: string;
	@Input() result:boolean;
	msgOperation: string;
	msgResult: string;
	showSuccess: boolean = false;
	showError:boolean = false;

	constructor() { }

	ngOnInit() {
		switch (this.operation) {
			case 'GET': {
				if(this.result){
					this.msgOperation = 'Proyectos cargados';
					this.showSuccess = true;
				} else {
					this.msgOperation = 'cargar los proyectos';
					this.showError = true;
				}
				
			}
			break;
			case 'CREATE': {
				if(this.result){
					this.msgOperation = 'Proyecto creado';
					this.showSuccess = true;
				} else {
					this.msgOperation = 'tratar de crear el proyecto';
					this.showError = true;
				}
			}
			break;
			case 'UPDATE': {
				if(this.result){
					this.msgOperation = 'Proyecto actualizado';
					this.showSuccess = true;
				} else {
					this.msgOperation = 'tratar de actualizar el proyecto';
					this.showError = true;
				}
			}
			break;
			case 'DELETE': {
				if(this.result){
					this.msgOperation = 'Proyecto eliminado';
					this.showSuccess = true;
				} else {
					this.msgOperation = 'tratar de eliminar el proyecto';
					this.showError = true;
				}
			}
			break;

			default: {
				this.msgOperation = 'realizar la operacion. Oops algo paso! :S';
				this.showError = true;
			}
			break;
		}
	}

}
