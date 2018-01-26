import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule, MatSidenavModule, MatExpansionModule, MatIconModule, MatCardModule, MatButtonModule, MatChipsModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatTooltipModule } from "@angular/material";

import { HttpClientModule } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MessagesComponent } from './messages/messages.component';

@NgModule({
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatSidenavModule,
		MatExpansionModule,
		MatIconModule,
		MatCardModule,
		MatButtonModule,
		HttpClientModule,
		MatChipsModule,
		MatDialogModule,
		MatInputModule, 
		MatFormFieldModule,
		MatTooltipModule
	],
	declarations: [
		MessagesComponent
	],
	exports: [
		BrowserAnimationsModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatToolbarModule,
		MatSidenavModule,
		MatExpansionModule,
		MatIconModule,
		MatCardModule,
		MatButtonModule,
		HttpClientModule,
		MatChipsModule,
		MatDialogModule,
		MatInputModule,
		MatFormFieldModule,
		MatTooltipModule,
		MessagesComponent
	]
})
export class SharedModule { }
