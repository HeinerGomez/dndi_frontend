import { Component, OnInit } from "@angular/core";
import { Disease } from "../../../../../models/Disease";
import { DiseasesService } from "../../../../../services/app-services/diseases.service";
import { ModalService } from "../../../../../services/shared/modal.service";
import { FormDiseasesComponent } from "../form-diseases/form-diseases.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationsService } from "../../../../../services/shared/notifications.service";

@Component({
	selector: "app-render-diseases",
	templateUrl: "./render-diseases.component.html",
	styles: [],
})
export class RenderDiseasesComponent implements OnInit {
	public reactiveForm: FormGroup;
	public diseases: Disease[];
	private diseasesWithoutFilter: Disease[];

	constructor(
		private diseasesService: DiseasesService,
		private modalService: ModalService,
		private formBuilder: FormBuilder,
		private notificationsService: NotificationsService
	) {
		this.diseases = [];
		this.diseasesWithoutFilter = [];
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
		this.diseases = await this.diseasesService.getDiseases();
		this.diseasesWithoutFilter = this.diseases;
	}

	public searchDiseases(): void {
		const searchTermControl = this.getcontrol("searchTerm");

		if (searchTermControl.valid) {
			const searchTermValue: string = searchTermControl.value;

			this.diseases = this.diseasesWithoutFilter.filter((disease: Disease) =>
				disease.name.toLowerCase().startsWith(searchTermValue.toLowerCase())
			);
		}
	}

	public restartSearch(): void {
		this.getcontrol("searchTerm").reset();
		this.diseases = this.diseasesWithoutFilter;
	}

	public getcontrol(control: string) {
		return this.reactiveForm.get(control);
	}

	public openModal(disease: Disease) {
		const title = disease ? "Editar Enfermedad" : "Crear Enfermedad";

		this.modalService.open({
			component: FormDiseasesComponent,
			title: title,
			size: "modal-xl",
			params: {
				isForCreate: disease ? false : true,
				disease: disease ? disease : null,
			},
		});

		this.modalService.watchData().subscribe((data: any) => {
			if (data && data.shouldReload) {
				this.renderView();
				this.modalService.resetEmitData();
			}
		});
	}

	public async delete(disease: Disease) {
		const diseaseDeleted = await this.diseasesService.deleteDisease(disease.id);

		this.notificationsService.success({
			title: "Enfermedad eliminada exitosamente",
			message: `La enfermedad: ${diseaseDeleted.name}, fue eliminada con exito!`,
		});

		this.renderView();
	}
}
