import { Component, OnInit } from "@angular/core";
import { ModalService } from "../../../../../services/shared/modal.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationsService } from "../../../../../services/shared/notifications.service";
import { RepositoryImagesService } from "../../../../../services/app-services/repository-images.service";
import { RepositoryImage } from "../../../../../models/RepositoryImage";
import { FormImageBankComponent } from "../form-image-bank/form-image-bank.component";

@Component({
	selector: "app-render-image-bank",
	templateUrl: "./render-image-bank.component.html",
	styles: [],
})
export class RenderImageBankComponent implements OnInit {
	public reactiveForm: FormGroup;
	public images: RepositoryImage[];
	private imagesWithoutFilter: RepositoryImage[];

	constructor(
		private modalService: ModalService,
		private formBuilder: FormBuilder,
		private notificationsService: NotificationsService,
		private repositoryImagesService: RepositoryImagesService
	) {
		this.images = [];
		this.imagesWithoutFilter = [];
	}

	ngOnInit() {
		this.renderView();
		this.reactiveForm = this.defineReactiveForm();
	}

	private defineReactiveForm(): FormGroup {
		return this.formBuilder.group({
			searchTerm: ["", [Validators.required]],
		});
	}

	private async renderView() {
		this.images = await this.repositoryImagesService.getImages();
		this.imagesWithoutFilter = this.images;
	}

	public searchImages(): void {
		const searchTermControl = this.getcontrol("searchTerm");

		if (searchTermControl.valid) {
			const searchTermValue: string = searchTermControl.value;

			this.images = this.imagesWithoutFilter.filter((image: RepositoryImage) =>
				image.key.toLowerCase().startsWith(searchTermValue.toLowerCase())
			);
		}
	}

	public restartSearch(): void {
		this.getcontrol("searchTerm").reset();
		this.images = this.imagesWithoutFilter;
	}

	public getcontrol(control: string) {
		return this.reactiveForm.get(control);
	}

	public openModal(image: RepositoryImage) {
		const title = image ? "Editar Imagen" : "Crear Imagen";

		this.modalService.open({
			component: FormImageBankComponent,
			title: title,
			size: "modal-xl",
			params: {
				isForCreate: image ? false : true,
				image: image ? image : null,
			},
		});

		this.modalService.watchData().subscribe((data: any) => {
			if (data && data.shouldReload) {
				this.renderView();
				this.modalService.resetEmitData();
			}
		});
	}

	public async delete(image: RepositoryImage) {
		const imageDeleted = await this.repositoryImagesService.deleteImage(
			image.id
		);

		this.notificationsService.success({
			title: "Imagen eliminada exitosamente",
			message: `La imagen: ${imageDeleted.title}, fue eliminada con exito!`,
		});

		this.renderView();
	}
}
