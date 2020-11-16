import { Component, OnInit } from "@angular/core";
import { ShareDataService } from "../../../../../services/shared/share-data.service";
import { SelfEvaluation } from "../../../../../models/SelfEvaluation";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Question } from "../../../../../models/Question";
import { ModalService } from "../../../../../services/shared/modal.service";
import { FormQuestionComponent } from "../form-question/form-question.component";
import { QuestionsService } from "../../../../../services/app-services/questions.service";
import { NotificationsService } from "../../../../../services/shared/notifications.service";

@Component({
	selector: "app-questions",
	templateUrl: "./questions.component.html",
	styleUrls: ["./questions.component.sass"],
})
export class QuestionsComponent implements OnInit {
	public reactiveForm: FormGroup;
	private selfEvaluation: SelfEvaluation;
	public questions: Question[];
	private questionsWithoutFilter: Question[];
	private limitOfQuestions = 10;

	constructor(
		private shareDataService: ShareDataService,
		private modalService: ModalService,
		private formBuilder: FormBuilder,
		private notificationsService: NotificationsService,
		private questionsService: QuestionsService
	) {
		this.questions = [];
		this.questionsWithoutFilter = [];
	}

	ngOnInit() {
		this.reactiveForm = this.defineReactiveForm();
		this.renderView();
	}

	private defineReactiveForm(): FormGroup {
		return this.formBuilder.group({
			searchTerm: ["", [Validators.required]],
		});
	}

	private async renderView() {
		this.selfEvaluation = this.shareDataService.data["selfEvaluation"];

		const control = this.getcontrol("searchTerm");

		if (control.dirty) {
			control.reset();
		}

		this.questions = await this.questionsService.getQuestionsBySelfEvaluationId(
			this.selfEvaluation.id
		);

		this.questionsWithoutFilter = this.questions;
	}

	public searchQuestions(): void {
		const searchTermControl = this.getcontrol("searchTerm");

		if (searchTermControl.valid) {
			const searchTermValue: string = searchTermControl.value;

			this.questions = this.questionsWithoutFilter.filter(
				(question: Question) =>
					question.name.toLowerCase().startsWith(searchTermValue.toLowerCase())
			);
		}
	}

	public restartSearch(): void {
		this.getcontrol("searchTerm").reset();
		this.questions = this.questionsWithoutFilter;
	}

	public getcontrol(control: string) {
		return this.reactiveForm.get(control);
	}

	public openModal(question: Question) {
		const title = question ? "Editar Pregunta" : "Crear Pregunta";

		const isAllowOpenModal =
			question == null && this.questions.length < this.limitOfQuestions;

		if (isAllowOpenModal || question) {
			this.modalService.open({
				component: FormQuestionComponent,
				title: title,
				size: "modal-xl",
				params: {
					isForCreate: question ? false : true,
					selfEvaluation: this.selfEvaluation ? this.selfEvaluation : null,
					question: question ? question : null,
				},
			});

			this.modalService.watchData().subscribe((data: any) => {
				if (data && data.shouldReload) {
					this.renderView();
					this.modalService.resetEmitData();
				}
			});
		} else {
			this.notificationsService.success({
				title: "Limite Alcanzado",
				message: `Limite de preguntas alcanzados, contacte con el administrador`,
			});
		}
	}
}
