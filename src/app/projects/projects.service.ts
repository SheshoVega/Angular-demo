import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Project } from '../core/models/project';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProjectsService {

	private apiRoot: string = 'http://localhost:3000/projects';
	operationResultSource = new BehaviorSubject<boolean>(false);
	operationResultObservable = this.operationResultSource.asObservable();

	constructor(private http: HttpClient) { }

	setOperationResult(result:boolean){
		this.operationResultSource.next(result);
	}

	getOperationResult(): Observable<boolean>{
		return this.operationResultObservable;
	}

	getProjects(): Observable<Project[]> {
		return this.http.get<Project[]>(this.apiRoot);
	}

	getProject(id:string):Observable<Project> {
		let apiUrl = `${this.apiRoot}/${id}`;
		return this.http.get<Project>(apiUrl);
	}

	deleteProject(id:string):Observable<any>{
		let apiUrl = `${this.apiRoot}/${id}`;
		return this.http.delete(apiUrl);
	}

	createProject(project:Project){
		return this.http.put(this.apiRoot,project);
	}

	updateProject(project:Project){
		return this.http.post(this.apiRoot,project);
	}
}
