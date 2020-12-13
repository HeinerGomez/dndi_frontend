import { Component, OnInit } from "@angular/core";
import { TermConditionService } from "../../../../../services/app-services/term-condition.service";
import { TermCondition } from "../../../../../models/TermCondition";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalService } from "../../../../../services/shared/modal.service";
import { ShareDataService } from "../../../../../services/shared/share-data.service";
import { FormPrivacyPoliciesComponent } from "../form-privacy-policies/form-privacy-policies.component";

@Component({
	selector: "app-render-privacy-policies",
	templateUrl: "./render-privacy-policies.component.html",
	styleUrls: ["./render-privacy-policies.component.sass"],
})
export class RenderPrivacyPoliciesComponent implements OnInit {
	public termAndConditions: TermCondition[] = [];
	private termAndConditionsWithoutFilter: TermCondition[] = [];
	public reactiveForm: FormGroup;

	constructor(
		private termCoditionService: TermConditionService,
		private formBuilder: FormBuilder,
		private modalService: ModalService,
		private shareDataService: ShareDataService
	) {}

	async ngOnInit() {
		this.reactiveForm = this.defineReactiveForm();
		this.renderView();
	}

	private async renderView() {
		const control = this.getcontrol("searchTerm");

		if (control.dirty) {
			control.reset();
		}

		this.termAndConditionsWithoutFilter = await this.termCoditionService.getTermAndConditions();
		this.termAndConditions = this.termAndConditionsWithoutFilter;
	}

	private defineReactiveForm(): FormGroup {
		return this.formBuilder.group({
			searchTerm: ["", [Validators.required]],
		});
	}

	public searchTerm() {
		const searchTerm = this.getcontrol("searchTerm");

		if (searchTerm.valid) {
			const term: String = searchTerm.value;
			this.termAndConditions = this.termAndConditionsWithoutFilter.filter(
				(termAndCondition) =>
					termAndCondition.name.toLowerCase().startsWith(term.toLowerCase())
			);
		}
	}

	public restartSearch() {
		this.getcontrol("searchTerm").reset();
		this.termAndConditions = this.termAndConditionsWithoutFilter;
	}

	public getcontrol(control: string) {
		return this.reactiveForm.get(control);
	}

	public openModal(termCondition: TermCondition) {
		let title = termCondition ? "Editar " : "Crear ";

		title = title + "Política De Privacidad";

		this.modalService.open({
			component: FormPrivacyPoliciesComponent,
			title: title,
			size: "modal-xl",
			params: {
				isForCreate: termCondition ? false : true,
				termCondition: termCondition ? termCondition : null,
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
