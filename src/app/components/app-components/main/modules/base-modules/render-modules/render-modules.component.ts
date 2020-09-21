import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModulesService } from "../../../../../../services/app-services/modules.service";
import { Module } from "../../../../../../models/Module";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalService } from "../../../../../../services/shared/modal.service";
import { FormModulesComponent } from "../form-modules/form-modules.component";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { Content } from "../../../../../../models/Content";
import { ContentsService } from "../../../../../../services/app-services/contents.service";
import { ShareDataService } from "../../../../../../services/shared/share-data.service";
import {
	NavigationRibbonData,
	NavigationRibbonConfig,
} from "../../../../../shared/navigation-ribbon/navigation-ribbon.component";
import { BreadCrumbCollectorService } from "../../../../../../services/shared/bread-crumb-collector.service";
import { NotificationsService } from "../../../../../../services/shared/notifications.service";

@Component({
	selector: "app-render-modules",
	templateUrl: "./render-modules.component.html",
	styles: [],
})
export class RenderModulesComponent implements OnInit, OnDestroy {
	public reactiveForm: FormGroup;
	public moduleId: number;
	public modules: Module[];
	public content: Content;
	private modulesWithoutFilter: Module[];
	public navigationRibbonConfig: NavigationRibbonConfig = {
		rootUrl: "/modules/module/0",
	};

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private modulesService: ModulesService,
		private contentsService: ContentsService,
		private formBuilder: FormBuilder,
		private modalService: ModalService,
		private shareDataService: ShareDataService,
		private breadCrumbCollectorService: BreadCrumbCollectorService,
		private notificationsService: NotificationsService
	) {
		this.modules = [];
		this.content = null;
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
		this.content = null;

		if (control.dirty) {
			control.reset();
		}

		if (this.moduleId == 0) {
			this.modules = await this.modulesService.getRootModules();
		} else {
			this.modules = await this.modulesService.getChildModules(this.moduleId);
			this.content = await this.contentsService.getContentOfModule(
				this.moduleId
			);
		}

		this.modulesWithoutFilter = this.modules;
	}

	private setupBreadCrumbCollector(module: Module) {
		this.breadCrumbCollectorService.collect({
			key: module.id.toString(),
			label: module == undefined || module == null ? " " : module.title,
			toNavigate: `/modules/module/${module.id}`,
		});
	}

	public enterModule(module: Module): void {
		this.setupBreadCrumbCollector(module);
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

	public async delete(content: Content) {
		const contentDeleted: Content = await this.contentsService.deleteContent(
			content.id
		);

		this.notificationsService.success({
			title: "Contenido eliminado exitosamente",
			message: `El Contenido: ${contentDeleted.title}, fue eliminado con exito!`,
		});

		this.renderView();
	}

	public openModal(module: Module): void {
		let title = module ? "Editar " : "Crear ";

		title = title + (this.isRootModule() ? "Módulo" : "Sub Módulo");

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

	public isRootModule(): boolean {
		return this.moduleId == 0;
	}

	public navigateToGenerateContent(content: Content): void {
		if (content) {
			this.shareDataService.data = { content: content, isForCreate: false };
			this.router.navigate([`/generate-content/${content.moduleId}`]);
		} else {
			this.shareDataService.data = { isForCreate: true };
			this.router.navigate([`/generate-content/${this.moduleId}`]);
		}
	}

	ngOnDestroy() {
		this.content = null;
		this.modules = [];
		this.breadCrumbCollectorService.restartCollection();
		this.breadCrumbCollectorService = null;
	}
}
