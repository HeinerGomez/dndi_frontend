import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModulesService } from "../../../../../../services/app-services/modules.service";
import { Module } from "../../../../../../models/Module";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalService } from "../../../../../../services/shared/modal.service";
import { FormModulesComponent } from "../form-modules/form-modules.component";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "app-render-modules",
	templateUrl: "./render-modules.component.html",
	styles: [],
})
export class RenderModulesComponent implements OnInit {
	public reactiveForm: FormGroup;
	public moduleId: number;
	public modules: Module[];
	private modulesWithoutFilter: Module[];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private modulesService: ModulesService,
		private formBuilder: FormBuilder,
		private modalService: ModalService,
		private config: NgbDropdownConfig
	) {
		this.modules = [];
	}

	ngOnInit() {
		this.reactiveForm = this.defineReactiveForm();
		this.route.params.subscribe((params) => {
			this.moduleId = parseInt(params["id"]);
			this.renderView();
		});
	}

	private defineReactiveForm(): FormGroup {
		return this.formBuilder.group({
			searchTerm: ["", [Validators.required]],
		});
	}

	private async renderView() {
		const control = this.getcontrol("searchTerm");

		if (control.dirty) {
			control.reset();
		}

		if (this.moduleId == 0) {
			this.modules = await this.modulesService.getRootModules();
		} else {
			this.modules = await this.modulesService.getChildModules(this.moduleId);
		}

		this.modulesWithoutFilter = this.modules;
	}

	public enterModule(module: Module): void {
		this.router.navigate([`/modules/module/${module.id}`]);
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

	public openModal(module: Module): void {
		console.warn("Este es el modulo: ", module);

		const title = module ? "Editar Modulo" : "Crear Modulo";

		this.modalService.open({
			component: FormModulesComponent,
			title: title,
			size: "modal-xl",
			params: {
				isForCreate: module ? false : true,
				module: module ? module : null,
				parentModuleId: this.moduleId,
			},
		});

		this.modalService.watchData().subscribe((data: any) => {
			if (data && data.shouldReload) {
				this.renderView();
				this.modalService.resetEmitData();
			}
		});
	}
}
