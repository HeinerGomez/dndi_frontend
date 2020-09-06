import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Module } from "../../../models/Module";
import { Router } from "@angular/router";
import { Content } from "../../../models/Content";

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

	@Output("clickIconCorner")
	public clickIconCorner = new EventEmitter<Module>();

	@Output("clickPill")
	public clickPill = new EventEmitter<Module | Content>();

	constructor(private router: Router) {}

	ngOnInit() {}

	public handleClickIconCorner() {
		if (this.clickIconCorner && this.module) {
			this.clickIconCorner.emit(this.module);
		}
	}

	public handleClickPill() {
		if (this.clickPill && this.module) {
			this.clickPill.emit(this.module);
		}

		if (this.clickPill && this.content) {
			this.clickPill.emit(this.content);
		}
	}
}
