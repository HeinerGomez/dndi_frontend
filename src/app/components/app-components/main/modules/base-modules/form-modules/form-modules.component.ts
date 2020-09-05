import { Component, OnInit } from "@angular/core";
import { ModalDataService } from "../../../../../../services/shared/modal-data.service";
import { Module } from "../../../../../../models/Module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModulesService } from "../../../../../../services/app-services/modules.service";
import { NotificationsService } from "../../../../../../services/shared/notifications.service";
import { ModalService } from "../../../../../../services/shared/modal.service";

export enum modes {
	CREATE = 1,
	UPDATE = 2,
}

@Component({
	selector: "app-form-modules",
	templateUrl: "./form-modules.component.html",
	styleUrls: ["./form-modules.component.sass"],
})
export class FormModulesComponent implements OnInit {
	private currentMode: modes;
	private module: Module;
	private parentModuleId: number;
	public reactiveForm: FormGroup;

	constructor(
		private modalDataService: ModalDataService,
		private formBuilder: FormBuilder,
		private modulesService: ModulesService,
		private notificationsService: NotificationsService,
		private modalService: ModalService
	) {}

	ngOnInit() {
		this.module = null;
		this.extractData();
		this.reactiveForm = this.defineReactiveForm();
	}

	private defineReactiveForm(): FormGroup {
		const isCreateMode: boolean = this.isCreateMode();

		return this.formBuilder.group({
			id: [isCreateMode ? null : this.module.id],
			moduleId: [this.parentModuleId == 0 ? null : this.parentModuleId],
			title: [isCreateMode ? "" : this.module.title, [Validators.required]],
			description: [
				isCreateMode ? "" : this.module.description,
				[Validators.minLength(10)],
			],
			pathImage: [""],
			diseaseId: [
				isCreateMode ? 1 : this.module.diseaseId,
				[Validators.required],
			], // TODO temporal
			languageId: [
				isCreateMode ? 1 : this.module.languageId,
				[Validators.required],
			], // TODO temporal
		});
	}

	private extractData(): void {
		const data: any = this.modalDataService.getData();
		const params: any = data.params;

		this.parentModuleId = parseInt(params.parentModuleId);

		console.info("parentModuleId: ", this.parentModuleId);

		if (params.isForCreate) {
			this.currentMode = modes.CREATE;
		} else {
			this.module = params.module;
			this.currentMode = modes.UPDATE;
		}
	}

	public isCreateMode(): boolean {
		return this.currentMode == modes.CREATE;
	}

	public async save() {
		const data = this.reactiveForm.value;
		console.info("data: ", data);
		const transformData = Module.deserializeFromData(data);
		console.info("transformData: ", transformData);

		if (this.isCreateMode()) {
			const moduleCreated: Module = await this.modulesService.createModule(
				transformData
			);

			this.notificationsService.success({
				title: "Módulo creado exitosamente",
				message: `El módulo: ${moduleCreated.title}, fue creado con exito!`,
			});
		} else {
			const moduleUpdated: Module = await this.modulesService.updateModule(
				transformData,
				this.module.id
			);

			this.notificationsService.success({
				title: "Módulo actualizado exitosamente",
				message: `El módulo: ${moduleUpdated.title}, fue actualizado con exito!`,
			});
		}

		this.modalService.emitData({ shouldReload: true });
		this.modalService.close();
	}
}
