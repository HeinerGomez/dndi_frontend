import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GlossaryWord } from "../../../../../models/GlossaryWord";
import { ModalDataService } from "../../../../../services/shared/modal-data.service";
import { GlossaryWordService } from "../../../../../services/app-services/glossary-word-service";
import { NotificationsService } from "../../../../../services/shared/notifications.service";
import { ModalService } from "../../../../../services/shared/modal.service";

export enum modes {
	CREATE = 1,
	UPDATE = 2,
}

@Component({
	selector: "app-form-glossary-word",
	templateUrl: "./form-glossary-word.component.html",
	styles: [],
})
export class FormGlossaryWordComponent implements OnInit {
	private currentMode: modes;
	private glossaryWord: GlossaryWord;
	public reactiveForm: FormGroup;

	constructor(
		private modalDataService: ModalDataService,
		private formBuilder: FormBuilder,
		private glossaryWordService: GlossaryWordService,
		private notificationsService: NotificationsService,
		private modalService: ModalService
	) {}

	ngOnInit() {
		this.glossaryWord = null;
		this.extractData();
		this.reactiveForm = this.defineReactiveForm();
	}

	private defineReactiveForm(): FormGroup {
		const isCreateMode: boolean = this.isCreateMode();

		return this.formBuilder.group({
			id: [isCreateMode ? null : this.glossaryWord.id],
			title: [
				isCreateMode ? "" : this.glossaryWord.title,
				[Validators.required, Validators.minLength(5)],
			],
			status: [1, [Validators.required]],
			description: [
				isCreateMode ? "" : this.glossaryWord.description,
				[
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(250),
				],
			],
		});
	}

	private extractData(): void {
		const data: any = this.modalDataService.getData();
		const params: any = data.params;

		if (params.isForCreate) {
			this.currentMode = modes.CREATE;
		} else {
			this.glossaryWord = params.glossaryWord;
			this.currentMode = modes.UPDATE;
		}
	}

	public isCreateMode(): boolean {
		return this.currentMode == modes.CREATE;
	}

	public async save() {
		const data = this.reactiveForm.value;

		if (this.isCreateMode()) {
			const glossaryWordCreated: GlossaryWord = await this.glossaryWordService.createGlossaryWord(
				data
			);

			this.notificationsService.success({
				title: "Palabra creada exitosamente",
				message: `La palabra: ${glossaryWordCreated.title}, fue creada con exito!`,
			});
		} else {
			const glossaryWordUpdated: GlossaryWord = await this.glossaryWordService.updateGlossaryWord(
				data,
				this.glossaryWord.id
			);

			this.notificationsService.success({
				title: "Palabra actualizada exitosamente",
				message: `La palabra: ${glossaryWordUpdated.title}, fue actualizada con exito!`,
			});
		}

		this.modalService.emitData({ shouldReload: true });
		this.modalService.close();
	}
}
