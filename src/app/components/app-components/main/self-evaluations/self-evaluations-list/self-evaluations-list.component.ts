import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SelfEvaluation } from "../../../../../models/SelfEvaluation";
import { ModalService } from "../../../../../services/shared/modal.service";
import { NotificationsService } from "../../../../../services/shared/notifications.service";
import { SelfEvaluationsService } from "../../../../../services/app-services/self-evaluations.service";
import { FormSelfEvaluationsComponent } from "../form-self-evaluations/form-self-evaluations.component";

@Component({
	selector: "app-self-evaluations-list",
	templateUrl: "./self-evaluations-list.component.html",
	styleUrls: ["./self-evaluations-list.component.sass"],
})
export class SelfEvaluationsListComponent implements OnInit {
	public reactiveForm: FormGroup;
	public selfEvaluations: SelfEvaluation[];
	private selfEvaluationsWithoutFilter: SelfEvaluation[];

	constructor(
		private modalService: ModalService,
		private formBuilder: FormBuilder,
		private selfEvaluationsService: SelfEvaluationsService
	) {
		this.selfEvaluations = [];
		this.selfEvaluationsWithoutFilter = [];
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
		this.selfEvaluations = await this.selfEvaluationsService.getSelfEvaluations();
		this.selfEvaluationsWithoutFilter = this.selfEvaluations;
	}

	public searchSelfEvaluations(): void {
		const searchTermControl = this.getcontrol("searchTerm");

		if (searchTermControl.valid) {
			const searchTermValue: string = searchTermControl.value;

			this.selfEvaluations = this.selfEvaluationsWithoutFilter.filter(
				(selfEvaluation: SelfEvaluation) =>
					selfEvaluation.name
						.toLowerCase()
						.startsWith(searchTermValue.toLowerCase())
			);
		}
	}

	public restartSearch(): void {
		this.getcontrol("searchTerm").reset();
		this.selfEvaluations = this.selfEvaluationsWithoutFilter;
	}

	public getcontrol(control: string) {
		return this.reactiveForm.get(control);
	}

	public openModal(selfEvaluation: SelfEvaluation) {
		const title = selfEvaluation
			? "Editar Auto Evaluación"
			: "Crear Auto Evaluación";

		this.modalService.open({
			component: FormSelfEvaluationsComponent,
			title: title,
			size: "modal-xl",
			params: {
				isForCreate: selfEvaluation ? false : true,
				selfEvaluation: selfEvaluation ? selfEvaluation : null,
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
