import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styles: [],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	error: string;
	progress: boolean | number = false;

	slideConfig2 = {
		className: "center",
		centerMode: true,
		infinite: true,
		centerPadding: "0",
		slidesToShow: 1,
		speed: 500,
		dots: false,
	};

	constructor(private router: Router, private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]],
		});
	}

	get controls(): any {
		return this.loginForm.controls;
	}

	login = (): void => {
		this.progress = 0;
		this.router.navigate(["/modules"]);
		this.progress = 1;
	};
}
