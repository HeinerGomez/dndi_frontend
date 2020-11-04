import { Component, OnInit } from "@angular/core";
import { SelfEvaluation } from "../../../../../models/SelfEvaluation";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalDataService } from "../../../../../services/shared/modal-data.service";
import { NotificationsService } from "../../../../../services/shared/notifications.service";
import { ModalService } from "../../../../../services/shared/modal.service";
import { SelfEvaluationsService } from "../../../../../services/app-services/self-evaluations.service";

export enum modes {
	CREATE = 1,
	UPDATE = 2,
}

@Component({
	selector: "app-form-self-evaluations",
	templateUrl: "./form-self-evaluations.component.html",
	styles: [],
})
export class FormSelfEvaluationsComponent implements OnInit {
	private currentMode: modes;
	private selfEvaluation: SelfEvaluation;
	public reactiveForm: FormGroup;
	public titleForm: string;

	public isLoading: boolean = false;

	constructor(
		private modalDataService: ModalDataService,
		private formBuilder: FormBuilder,
		private selfEvaluationsService: SelfEvaluationsService,
		private notificationsService: NotificationsService,
		private modalService: ModalService
	) {}

	ngOnInit() {
		this.selfEvaluation = null;
		this.extractData();
		this.reactiveForm = this.defineReactiveForm();
		this.titleForm = "Auto Evaluación";
	}

	private defineReactiveForm(): FormGroup {
		const isCreateMode: boolean = this.isCreateMode();

		return this.formBuilder.group({
			id: [isCreateMode ? null : this.selfEvaluation.id],
			name: [
				isCreateMode ? "" : this.selfEvaluation.name,
				[Validators.required, Validators.minLength(5)],
			],
			status: [1, [Validators.required]],
		});
	}

	private extractData(): void {
		const data: any = this.modalDataService.getData();
		const params: any = data.params;

		if (params.isForCreate) {
			this.currentMode = modes.CREATE;
		} else {
			this.selfEvaluation = params.selfEvaluation;
			this.currentMode = modes.UPDATE;
		}
	}

	public isCreateMode(): boolean {
		return this.currentMode == modes.CREATE;
	}

	public async save() {
		this.isLoading = true;
		const data = this.reactiveForm.value;

		if (this.isCreateMode()) {
			const selfEvaluationCreated: SelfEvaluation = await this.selfEvaluationsService.createSelfEvaluation(
				data
			);

			this.notificationsService.success({
				title: "Auto Evaluación creado exitosamente",
				message: `La Auto Evaluación: ${selfEvaluationCreated.name}, fue creado con exito!`,
			});
		} else {
			const selfEvaluationUpdated: SelfEvaluation = await this.selfEvaluationsService.updateSelfEvaluation(
				data,
				this.selfEvaluation.id
			);

			this.notificationsService.success({
				title: "Auto Evaluación actualizado exitosamente",
				message: `La Auto Evaluación: ${selfEvaluationUpdated.name}, fue actualizado con exito!`,
			});
		}

		this.isLoading = false;
		this.modalService.emitData({ shouldReload: true });
		this.modalService.close();
	}

	public async delete() {
		if (!this.isCreateMode()) {
			const selfEvaluationDeleted: SelfEvaluation = await this.selfEvaluationsService.deleteSelfEvaluation(
				this.selfEvaluation.id
			);

			this.notificationsService.success({
				title: "Auto Evaluación eliminado exitosamente",
				message: `La Auto Evaluación: ${selfEvaluationDeleted.name}, fue eliminado con exito!`,
			});

			this.modalService.emitData({ shouldReload: true });
			this.modalService.close();
		}
	}
}
