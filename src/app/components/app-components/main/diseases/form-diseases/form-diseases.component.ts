import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalDataService } from "../../../../../services/shared/modal-data.service";
import { NotificationsService } from "../../../../../services/shared/notifications.service";
import { ModalService } from "../../../../../services/shared/modal.service";
import { DiseasesService } from "../../../../../services/app-services/diseases.service";
import { Disease } from "../../../../../models/Disease";
import { Language } from "../../../../../models/Language";

export enum modes {
	CREATE = 1,
	UPDATE = 2,
}

@Component({
	selector: "app-form-diseases",
	templateUrl: "./form-diseases.component.html",
	styles: [],
})
export class FormDiseasesComponent implements OnInit {
	private currentMode: modes;
	public reactiveForm: FormGroup;
	public disease: Disease;
	public languages: Language[];

	constructor(
		private modalDataService: ModalDataService,
		private formBuilder: FormBuilder,
		private notificationsService: NotificationsService,
		private modalService: ModalService,
		private diseasesServices: DiseasesService
	) {}

	ngOnInit() {
		this.disease = null;
		this.languages = [];
		this.extractData();
		this.getDependencies();
		this.reactiveForm = this.defineReactiveForm();
	}

	private extractData(): void {
		const data: any = this.modalDataService.getData();
		const params: any = data.params;

		if (params.isForCreate) {
			this.currentMode = modes.CREATE;
		} else {
			this.disease = params.disease;
			this.currentMode = modes.UPDATE;
		}
	}

	private defineReactiveForm(): FormGroup {
		const isCreateMode = this.isCreateMode();

		return this.formBuilder.group({
			id: [isCreateMode ? null : this.disease.id],
			name: [
				isCreateMode ? "" : this.disease.name,
				[Validators.required, Validators.minLength(5)],
			],
			description: [
				isCreateMode ? "" : this.disease.description,
				[Validators.minLength(10)],
			],
			languages: [null, [Validators.required]],
		});
	}

	public async getDependencies() {
		const data: any = await this.diseasesServices.getDependencies();

		this.languages = data.languages;

		if (!this.isCreateMode()) {
			const languages: Language[] = this.disease.languages;
			let idsLanguages: number[] = [];

			languages.map((language) => {
				idsLanguages.push(language.id);
			});

			if (idsLanguages.length > 0) {
				this.reactiveForm.get("languages").setValue(idsLanguages);
			}
		}
	}

	private isCreateMode(): boolean {
		return this.currentMode == modes.CREATE;
	}

	public async save() {
		const data = this.reactiveForm.value;
		let dataToSend = {
			name: data["name"],
			languages: data["languages"],
		};

		if (data["description"] != null && data["description"] != "") {
			dataToSend["description"] = data["description"];
		}

		if (this.isCreateMode()) {
			const diseaseCreated: Disease = await this.diseasesServices.createDisease(
				dataToSend
			);

			this.notificationsService.success({
				title: "Enfermedad creado exitosamente",
				message: `La enfermedad: ${diseaseCreated.name}, fue creada con exito!`,
			});
		} else {
			const diseaseUpdated: Disease = await this.diseasesServices.updateDisease(
				dataToSend,
				this.disease.id
			);

			this.notificationsService.success({
				title: "Enfermedad actualizada exitosamente",
				message: `La enfermedad: ${diseaseUpdated.name}, fue actualizada con exito!`,
			});
		}

		this.modalService.emitData({ shouldReload: true });
		this.modalService.close();
	}
}
