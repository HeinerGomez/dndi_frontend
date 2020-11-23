import { Component, OnInit } from "@angular/core";
import { Disease } from "../../../../../models/Disease";
import { DiseasesService } from "../../../../../services/app-services/diseases.service";
import { ModalService } from "../../../../../services/shared/modal.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationsService } from "../../../../../services/shared/notifications.service";
import { Router } from "@angular/router";

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
		private formBuilder: FormBuilder,
		private router: Router
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

	public enterDisease(disease: Disease) {
		this.router.navigate([`modules/render-languages/${disease.id}`]);
	}
}
