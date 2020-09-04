import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModulesService } from "../../../../../../services/app-services/modules.service";
import { Module } from "../../../../../../models/Module";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
	selector: "app-render-modules",
	templateUrl: "./render-modules.component.html",
	styles: [],
})
export class RenderModulesComponent implements OnInit {
	public reactiveForm: FormGroup;
	public moduleId: string;
	public modules: Module[];
	private modulesWithoutFilter: Module[];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private modulesService: ModulesService,
		private formBuilder: FormBuilder
	) {
		this.modules = [];
	}

	ngOnInit() {
		this.reactiveForm = this.defineReactiveForm();
		this.route.params.subscribe((params) => {
			this.moduleId = params["id"];
			this.renderView();
		});
	}

	private defineReactiveForm(): FormGroup {
		return this.formBuilder.group({
			searchTerm: ["", [Validators.required]],
		});
	}

	private async renderView() {
		this.modules = await this.modulesService.getRootModules();
		this.modulesWithoutFilter = this.modules;
	}

	public searchModules(): void {
		const searchTermControl = this.getcontrol("searchTerm");

		if (searchTermControl.valid) {
			const searchTermValue: string = searchTermControl.value;

			this.modules = this.modulesWithoutFilter.filter((module: Module) =>
				module.title.toLowerCase().startsWith(searchTermValue.toLowerCase())
			);
		}
	}

	public restartSearch(): void {
		this.getcontrol("searchTerm").reset();
		this.modules = this.modulesWithoutFilter;
	}

	public getcontrol(control: string) {
		return this.reactiveForm.get(control);
	}
}
