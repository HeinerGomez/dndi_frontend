import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RepositoryImage } from "../../../models/RepositoryImage";

@Component({
	selector: "squared-pill-image-button",
	templateUrl: "./squared-pill-image-button.component.html",
	styleUrls: ["./squared-pill-image-button.component.sass"],
})
export class SquaredPillImageButtonComponent implements OnInit {
	@Input("image")
	public image: RepositoryImage;

	@Output("clickIconCorner")
	public clickIconCorner = new EventEmitter<RepositoryImage>();

	@Output("clickPill")
	public clickPill = new EventEmitter<RepositoryImage>();

	constructor() {}

	ngOnInit() {
		console.log("La img: ", this.image);
	}

	public handleClickIconCorner() {
		if (this.clickIconCorner && this.image) {
			this.clickIconCorner.emit(this.image);
		}
	}

	public handleClickPill() {
		if (this.clickPill && this.image) {
			this.clickPill.emit(this.image);
		}
	}
}
