import { Component, OnInit } from "@angular/core";
import { Disease } from "../../../../../models/Disease";
import { DiseasesService } from "../../../../../services/app-services/diseases.service";
import { ModalService } from "../../../../../services/shared/modal.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationsService } from "../../../../../services/shared/notifications.service";
import { Router } from "@angular/router";
import { NavigationRibbonConfig } from "../../../../shared/navigation-ribbon/navigation-ribbon.component";
import { BreadCrumbCollectorService } from "../../../../../services/shared/bread-crumb-collector.service";

@Component({
	selector: "app-render-diseases",
	templateUrl: "./render-diseases.component.html",
	styles: [],
})
export class RenderDiseasesComponent implements OnInit {
	public reactiveForm: FormGroup;
	public diseases: Disease[];
	private diseasesWithoutFilter: Disease[];
	public navigationRibbonConfig: NavigationRibbonConfig = {
		rootUrl: "modules/render-diseases",
	};

	constructor(
		private diseasesService: DiseasesService,
		private formBuilder: FormBuilder,
		private router: Router,
		private breadCrumbCollectorService: BreadCrumbCollectorService
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
		this.setupBreadCrumbCollector(disease);
		this.router.navigate([`modules/render-languages/${disease.id}`]);
	}

	private setupBreadCrumbCollector(disease: Disease) {
		this.breadCrumbCollectorService.collect({
			key: disease.id.toString(),
			label: disease == undefined || disease == null ? " " : disease.name,
			toNavigate: `modules/render-languages/${disease.id}`,
		});
	}
}
