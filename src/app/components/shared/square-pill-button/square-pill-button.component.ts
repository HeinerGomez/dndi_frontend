import { Component, OnInit, Input } from "@angular/core";
import { Module } from "../../../models/Module";

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

	constructor() {}

	ngOnInit() {}
}
