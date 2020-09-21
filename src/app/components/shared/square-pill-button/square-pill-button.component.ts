import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Module } from "../../../models/Module";
import { Router } from "@angular/router";
import { Content } from "../../../models/Content";
import { Disease } from "../../../models/Disease";

@Component({
	selector: "square-pill-button",
	templateUrl: "./square-pill-button.component.html",
	styleUrls: ["./square-pill-button.component.sass"],
})
export class SquarePillButtonComponent implements OnInit {
	@Input("pillMode")
	public pillMode: number;

	@Input("pillIcon")
	public pillIcon: string;

	@Input("module")
	public module: Module;

	@Input("content")
	public content: Content;

	@Input("disease")
	public disease: Disease;

	@Output("clickIconCorner")
	public clickIconCorner = new EventEmitter<Module | Content | Disease>();

	@Output("clickPill")
	public clickPill = new EventEmitter<Module | Content | Disease>();

	constructor(private router: Router) {}

	ngOnInit() {}

	public handleClickIconCorner() {
		if (this.clickIconCorner && this.module) {
			this.clickIconCorner.emit(this.module);
		}

		if (this.clickIconCorner && this.content) {
			this.clickIconCorner.emit(this.content);
		}

		if (this.clickIconCorner && this.disease) {
			this.clickIconCorner.emit(this.disease);
		}
	}

	public handleClickPill() {
		if (this.clickPill && this.module) {
			this.clickPill.emit(this.module);
		}

		if (this.clickPill && this.content) {
			this.clickPill.emit(this.content);
		}

		if (this.clickPill && this.disease) {
			this.clickPill.emit(this.disease);
		}
	}
}
