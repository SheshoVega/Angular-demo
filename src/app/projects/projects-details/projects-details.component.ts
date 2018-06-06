import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from "@angular/common/http";

//RXJS operators
import { map } from 'rxjs/operators';

import { Project } from "../../core/models/project";
import { ProjectsService } from '../projects.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-projects-details',
	templateUrl: './projects-details.component.html',
	styleUrls: ['./projects-details.component.scss']
})
export class ProjectsDetailsComponent implements OnInit, OnDestroy {

	paramsSub: Subscription;
	project: Project;

	constructor(private route: ActivatedRoute, private projectsService: ProjectsService) { }

	ngOnInit() {

		this.paramsSub = this.route.params.pipe(
			map(params => params['id'])
		).subscribe(projectId => {
			this.projectsService.getProject(projectId).subscribe(
				(data: Project) => {
					console.log(data);
					this.project = data;
				},
				(err: HttpErrorResponse) => {
					if (err.error instanceof Error) {
						console.log('Client-Side error:', err.error.message);
					} else {
						console.log(`Backend error: codigo [ ${err.status} ], error: [ ${err.error} ]`);
					}
				}
			);
		});

	}

	ngOnDestroy() {
		this.paramsSub.unsubscribe();
	}

}
