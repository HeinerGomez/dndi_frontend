import { Component, OnInit } from "@angular/core";
import { Question } from "../../../../../models/Question";
import { Answer } from "../../../../../models/Answer";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ModalDataService } from "../../../../../services/shared/modal-data.service";
import { SelfEvaluationsService } from "../../../../../services/app-services/self-evaluations.service";
import { NotificationsService } from "../../../../../services/shared/notifications.service";
import { ModalService } from "../../../../../services/shared/modal.service";
import { SelfEvaluation } from "../../../../../models/SelfEvaluation";
import { QuestionsService } from "../../../../../services/app-services/questions.service";

export enum modes {
	CREATE = 1,
	UPDATE = 2,
}

@Component({
	selector: "app-form-question",
	templateUrl: "./form-question.component.html",
	styles: [],
})
export class FormQuestionComponent implements OnInit {
	private currentMode: modes;
	public question: Question;
	public selfEvaluation: SelfEvaluation;
	public answers: Answer[];
	public reactiveForm: FormGroup;
	public titleForm: string;
	public isLoading: boolean = false;
	private lastRow = 1;

	constructor(
		private modalDataService: ModalDataService,
		private formBuilder: FormBuilder,
		private questionsService: QuestionsService,
		private notificationsService: NotificationsService,
		private modalService: ModalService
	) {}

	ngOnInit() {
		this.question = null;
		this.selfEvaluation = null;
		this.extractData();
		this.reactiveForm = this.defineReactiveForm();
		this.titleForm = "Preguntas";
	}

	private defineReactiveForm(): FormGroup {
		const isCreateMode: boolean = this.isCreateMode();

		let reactiveForm = this.formBuilder.group({
			id: [isCreateMode ? null : this.question.id],
			name: [
				isCreateMode ? "" : this.question.name,
				[Validators.required, Validators.minLength(5)],
			],
			dataAnswer: this.formBuilder.array([
				this.formBuilder.group({
					id: [1, []],
					name: ["", [Validators.required]],
					tag: ["", [Validators.required]],
					isValid: [false, [Validators.required]],
				}),
			]),
			selfEvaluationId: [
				this.selfEvaluation == null ? null : this.selfEvaluation.id,
			],
		});

		if (!isCreateMode) {
			const dataAnswer = reactiveForm.get("dataAnswer") as FormArray;
			dataAnswer.removeAt(0);
			this.lastRow = 0;
			for (let answer of this.answers) {
				this.addRow(reactiveForm, answer);
			}
		}

		return reactiveForm;
	}

	private extractData(): void {
		const data: any = this.modalDataService.getData();
		const params: any = data.params;
		this.selfEvaluation = params.selfEvaluation;

		if (params.isForCreate) {
			this.currentMode = modes.CREATE;
		} else {
			this.question = params.question;
			this.answers = this.question.answers;
			this.currentMode = modes.UPDATE;
		}
	}

	public isCreateMode(): boolean {
		return this.currentMode == modes.CREATE;
	}

	public async save() {
		const dataAnswer: string = JSON.stringify(
			this.reactiveForm.value["dataAnswer"]
		);

		const dataToSend = {
			name: this.reactiveForm.get("name").value,
			self_evaluation_id: this.reactiveForm.get("selfEvaluationId").value,
			data_answer: dataAnswer,
		};

		if (this.isCreateMode()) {
			const questionCreated: Question = await this.questionsService.createQuestion(
				dataToSend
			);

			this.notificationsService.success({
				title: "Pregunta creada exitosamente",
				message: `La Pregunta: ${questionCreated.name}, fue creada con exito!`,
			});
		} else {
			const questionUpdated: Question = await this.questionsService.updateQuestion(
				dataToSend,
				this.question.id
			);

			this.notificationsService.success({
				title: "Pregunta actualizada exitosamente",
				message: `La Pregunta: ${questionUpdated.name}, fue actualizada con exito!`,
			});
		}

		this.isLoading = false;
		this.modalService.emitData({ shouldReload: true });
		this.modalService.close();
	}

	public async delete() {
		if (!this.isCreateMode()) {
			const questionDeleted: Question = await this.questionsService.deleteQuestion(
				this.question.id
			);

			this.notificationsService.success({
				title: "Pregunta eliminada exitosamente",
				message: `La Pregunta: ${questionDeleted.name}, fue eliminada con exito!`,
			});

			this.modalService.emitData({ shouldReload: true });
			this.modalService.close();
		}
	}

	public addRow(reactiveForm: FormGroup, answer: Answer = null): void {
		const dataAnswer = reactiveForm.get("dataAnswer") as FormArray;
		if (reactiveForm.get("dataAnswer").valid || answer) {
			if (this.lastRow < 4) {
				this.lastRow++;
				dataAnswer.push(
					this.formBuilder.group({
						id: [answer != null ? answer.id : this.lastRow],
						name: [answer != null ? answer.name : "", [Validators.required]],
						tag: [answer != null ? answer.tag : "", [Validators.required]],
						isValid: [false, [Validators.required]],
					})
				);
			} else {
				this.notificationsService.success({
					title: "Limite alcanzado",
					message: `El limite de respuestas ha alcanzado su limite`,
				});
			}
		}
	}

	public deleteRow(index: number): void {
		const dataAnswer = this.reactiveForm.get("dataAnswer") as FormArray;
		if (dataAnswer.length > 1) {
			dataAnswer.removeAt(index);
			this.lastRow--;
		} else {
			this.reactiveForm.get("dataAnswer").reset();
			this.lastRow = 1;
		}
	}
}
