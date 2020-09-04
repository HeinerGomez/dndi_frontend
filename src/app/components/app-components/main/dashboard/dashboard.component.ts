import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styles: [],
})
export class DashboardComponent implements OnInit {
	userData: any;
	roles: any;

	appName: string = "DNDI";

	constructor() {}

	ngOnInit(): void {}
}
