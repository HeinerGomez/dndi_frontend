import { Component, OnInit } from "@angular/core";
import { RepositoryImage } from "../../../../../models/RepositoryImage";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RepositoryImagesService } from "../../../../../services/app-services/repository-images.service";
import { ModalDataService } from "../../../../../services/shared/modal-data.service";
import { NotificationsService } from "../../../../../services/shared/notifications.service";
import { ModalService } from "../../../../../services/shared/modal.service";

export enum modes {
	CREATE = 1,
	UPDATE = 2,
}

@Component({
	selector: "app-form-image-bank",
	templateUrl: "./form-image-bank.component.html",
	styles: [],
})
export class FormImageBankComponent implements OnInit {
	private currentMode: modes;
	private image: RepositoryImage;
	public reactiveForm: FormGroup;
	private selectedFile: File;
	public urlImage: any;

	constructor(
		private modalDataService: ModalDataService,
		private formBuilder: FormBuilder,
		private repositoryImagesService: RepositoryImagesService,
		private notificationsService: NotificationsService,
		private modalService: ModalService
	) {}

	ngOnInit() {
		this.image = null;
		this.urlImage = null;
		this.extractData();
		this.reactiveForm = this.defineReactiveForm();
		this.selectedFile = null;
	}

	private defineReactiveForm(): FormGroup {
		const isCreateMode: boolean = this.isCreateMode();

		return this.formBuilder.group({
			id: [isCreateMode ? null : this.image.id],
			title: [
				isCreateMode ? "" : this.image.title,
				[Validators.required, Validators.minLength(5)],
			],
			key: [
				isCreateMode ? "" : this.image.key,
				[Validators.required, Validators.minLength(5)],
			],
		});
	}

	private extractData(): void {
		const data: any = this.modalDataService.getData();
		const params: any = data.params;

		if (params.isForCreate) {
			this.currentMode = modes.CREATE;
		} else {
			this.image = params.image;
			this.urlImage = this.image.path;
			this.currentMode = modes.UPDATE;
		}
	}

	public isCreateMode(): boolean {
		return this.currentMode == modes.CREATE;
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
		const data = this.reactiveForm.value;

		if (this.isCreateMode()) {
			const imageCreated: RepositoryImage = await this.repositoryImagesService.createImage(
				data
			);

			this.notificationsService.success({
				title: "Imagen creada exitosamente",
				message: `La imagen: ${imageCreated.title}, fue creada con exito!`,
			});

			this.uploadImage(imageCreated.id);
		} else {
			const imageUpdated: RepositoryImage = await this.repositoryImagesService.updateImage(
				data,
				this.image.id
			);

			this.notificationsService.success({
				title: "Imagen actualizada exitosamente",
				message: `La imagen: ${imageUpdated.title}, fue actualizada con exito!`,
			});

			this.uploadImage(imageUpdated.id);
		}

		this.modalService.emitData({ shouldReload: true });
		this.modalService.close();
	}

	private async uploadImage(imageId: number) {
		const formData = new FormData();
		formData.append("image", this.selectedFile);

		if (this.selectedFile != null) {
			const imageUpdated: RepositoryImage = await this.repositoryImagesService.uploadImage(
				formData,
				imageId
			);

			this.notificationsService.success({
				title: "Imagen cargada",
				message: `La imagen ha sido asociada al banco de imagenes: ${imageUpdated.title}`,
			});
		}
	}

	public async delete() {
		if (!this.isCreateMode()) {
			const imageDeleted: RepositoryImage = await this.repositoryImagesService.deleteImage(
				this.image.id
			);

			this.notificationsService.success({
				title: "Imagen eliminado exitosamente",
				message: `La imagen: ${imageDeleted.title}, fue eliminada con exito!`,
			});

			this.modalService.emitData({ shouldReload: true });
			this.modalService.close();
		}
	}
}
