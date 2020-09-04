import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModulesService } from "../../../../../../services/app-services/modules.service";
import { Module } from "../../../../../../models/Module";

@Component({
	selector: "app-render-modules",
	templateUrl: "./render-modules.component.html",
	styles: [],
})
export class RenderModulesComponent implements OnInit {
	public moduleId: string;
	public modules: Module[];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private modulesService: ModulesService
	) {
		this.modules = [];
	}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.moduleId = params["id"];
			this.renderView();
		});
	}

	private async renderView() {
		this.modules = await this.modulesService.getRootModules();
	}
}
