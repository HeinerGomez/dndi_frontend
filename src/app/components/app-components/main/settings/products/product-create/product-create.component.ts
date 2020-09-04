import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-product-create",
	templateUrl: "./product-create.component.html",
	styles: [],
})
export class ProductCreateComponent implements OnInit {
	createProductForm: FormGroup;
	error: string;
	progress: boolean | number = false;

	status: any = [
		{ id: 1, name: "Active" },
		{ id: 2, name: "Inactive" },
	];

	categories: any = [
		{ id: 1, name: "Food" },
		{ id: 2, name: "Clothes" },
	];

	constructor(private router: Router, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.createProductForm = this.formBuilder.group({
			name: ["", [Validators.required]],
			category: ["", [Validators.required]],
			status: ["", [Validators.required]],
			description: ["", [Validators.required]],
			picture: ["", [Validators.required]],
		});
	}

	get controls(): any {
		return this.createProductForm.controls;
	}
}
