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
	private languageId: number;
	public reactiveForm: FormGroup;
	private selectedFile: File;
	public urlImage: any;
	public titleForm: string;

	public isLoading: boolean = false;

	constructor(
		private modalDataService: ModalDataService,
		private formBuilder: FormBuilder,
		private modulesService: ModulesService,
		private notificationsService: NotificationsService,
		private modalService: ModalService
	) {}

	ngOnInit() {
		this.module = null;
		this.urlImage = null;
		this.extractData();
		this.reactiveForm = this.defineReactiveForm();
		this.selectedFile = null;
		this.titleForm = this.isRootModule() ? "Módulo" : "Sub Módulo";
	}

	private defineReactiveForm(): FormGroup {
		const isCreateMode: boolean = this.isCreateMode();

		return this.formBuilder.group({
			id: [isCreateMode ? null : this.module.id],
			moduleId: [this.parentModuleId == 0 ? null : this.parentModuleId],
			title: [
				isCreateMode ? "" : this.module.title,
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(45),
				],
			],
			description: [
				isCreateMode ? "" : this.module.description,
				[Validators.minLength(10)],
			],
			isContentLink: [isCreateMode ? null : this.module.isContentLink],
			contentId: [isCreateMode ? null : this.module.contentId],
			pathImage: [""],
			diseaseId: [
				isCreateMode ? 1 : this.module.diseaseId,
				[Validators.required],
			], // TODO temporal
			languageId: [
				isCreateMode ? this.languageId : this.module.languageId,
				[Validators.required],
			], // TODO temporal
		});
	}

	private extractData(): void {
		const data: any = this.modalDataService.getData();
		const params: any = data.params;

		this.parentModuleId = parseInt(params.parentModuleId);
		this.languageId = params.languageId;

		if (params.isForCreate) {
			this.currentMode = modes.CREATE;
		} else {
			this.module = params.module;
			this.urlImage = this.module.pathImage;
			this.currentMode = modes.UPDATE;
		}
	}

	public isCreateMode(): boolean {
		return this.currentMode == modes.CREATE;
	}

	public isRootModule(): boolean {
		return this.parentModuleId == 0;
	}

	public handleChangeFile(event: any): void {
		const files: File[] = event.target.files;
		if (files.length) {
			if (
				files[0].type == "image/png" ||
				files[0].type == "image/jpeg" ||
				files[0].type == "image/jpg" ||
				files[0].type == "image/svg+xml" ||
				files[0].type == "image/svg"
			) {
				this.selectedFile = files[0];
				this.notificationsService.success({
					title: "Imagen Cargada",
					message: "Imagen cargada con exito",
				});
				this.generateImageUrl();
			} else {
				this.notificationsService.error({
					title: "Error en la carga",
					message: "No se logró cargar la imagen",
				});
			}
		} else {
			console.warn("No se ha seleccionado ningun archivo");
		}
	}

	private generateImageUrl() {
		const reader = new FileReader();
		reader.readAsDataURL(this.selectedFile);
		reader.onload = (_event) => {
			this.urlImage = reader.result;
		};
	}

	public async save() {
		this.isLoading = true;
		const data = this.reactiveForm.value;
		const transformData = Module.deserializeFromData(data);

		if (this.isCreateMode()) {
			const moduleCreated: Module = await this.modulesService.createModule(
				transformData
			);

			this.notificationsService.success({
				title: "Módulo creado exitosamente",
				message: `El módulo: ${moduleCreated.title}, fue creado con exito!`,
			});

			await this.uploadImage(moduleCreated.id);
		} else {
			const moduleUpdated: Module = await this.modulesService.updateModule(
				transformData,
				this.module.id
			);

			this.notificationsService.success({
				title: "Módulo actualizado exitosamente",
				message: `El módulo: ${moduleUpdated.title}, fue actualizado con exito!`,
			});

			await this.uploadImage(moduleUpdated.id);
		}

		this.isLoading = false;
		this.modalService.emitData({ shouldReload: true });
		this.modalService.close();
	}

	private async uploadImage(moduleId: number) {
		const formData = new FormData();
		formData.append("imageModule", this.selectedFile);

		if (this.selectedFile != null) {
			const moduleUpdated: Module = await this.modulesService.uploadImage(
				formData,
				moduleId
			);

			this.notificationsService.success({
				title: "Imagen cargada",
				message: `La imagen ha sido asociada al módulo: ${moduleUpdated.title}`,
			});
		}
	}

	public async delete() {
		if (!this.isCreateMode()) {
			const moduleDeleted: Module = await this.modulesService.deleteModule(
				this.module.id
			);

			this.notificationsService.success({
				title: "Módulo eliminado exitosamente",
				message: `El módulo: ${moduleDeleted.title}, fue eliminado con exito!`,
			});

			this.modalService.emitData({ shouldReload: true });
			this.modalService.close();
		}
	}
}
