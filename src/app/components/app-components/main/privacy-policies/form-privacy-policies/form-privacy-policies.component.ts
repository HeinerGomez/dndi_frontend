import { Component, OnInit } from "@angular/core";
import { TermCondition } from "../../../../../models/TermCondition";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalDataService } from "../../../../../services/shared/modal-data.service";
import { NotificationsService } from "../../../../../services/shared/notifications.service";
import { ModalService } from "../../../../../services/shared/modal.service";
import { TermConditionService } from "../../../../../services/app-services/term-condition.service";

export enum modes {
	CREATE = 1,
	UPDATE = 2,
}

@Component({
	selector: "app-form-privacy-policies",
	templateUrl: "./form-privacy-policies.component.html",
	styles: [],
})
export class FormPrivacyPoliciesComponent implements OnInit {
	private currentMode: modes;
	public reactiveForm: FormGroup;
	public termCondition: TermCondition;
	public typeTerms: any[] = [];

	editorConfig: any = {
		editable: true,
		spellcheck: true,
		height: "auto",
		minHeight: "200px",
		maxHeight: "auto",
		width: "auto",
		minWidth: "0",
		translate: "yes",
		placeholder: "Enter text here...",
		defaultParagraphSeparator: "",
		defaultFontName: "",
		defaultFontSize: "",
		fonts: [{ class: "arial", name: "Arial" }],
		sanitize: true,
		toolbarHiddenButtons: [
			[
				"strikeThrough",
				"subscript",
				"superscript",
				"justifyLeft",
				"justifyCenter",
				"justifyRight",
				"justifyFull",
				"outdent",
				"insertUnorderedList",
				"insertOrderedList",
				"heading",
				"fontName",
			],
			[
				"insertImage",
				"insertVideo",
				"fontSize",
				"textColor",
				"backgroundColor",
				"customClasses",
				"toggleEditorMode",
			],
		],
	};

	constructor(
		private modalDataService: ModalDataService,
		private formBuilder: FormBuilder,
		private notificationsService: NotificationsService,
		private modalService: ModalService,
		private termConditionService: TermConditionService
	) {}

	ngOnInit() {
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
			this.termCondition = params.termCondition;
			this.currentMode = modes.UPDATE;
		}
	}

	private defineReactiveForm(): FormGroup {
		const isCreateMode = this.isCreateMode();

		return this.formBuilder.group({
			id: [isCreateMode ? null : this.termCondition.id],
			name: [
				isCreateMode ? "" : this.termCondition.name,
				[Validators.required, Validators.minLength(5)],
			],
			type: [
				isCreateMode ? null : this.termCondition.type,
				[Validators.required],
			],
			content: [
				isCreateMode ? "" : this.termCondition.content,
				[Validators.minLength(10)],
			],
			isPublish: [isCreateMode ? 0 : this.termCondition.isPublish],
		});
	}

	public async getDependencies() {
		this.typeTerms.push({
			id: 1,
			name: "Terminos y Condiciones",
		});
		this.typeTerms.push({
			id: 2,
			name: "Politica de Privacidad",
		});
	}

	public isCreateMode(): boolean {
		return this.currentMode == modes.CREATE;
	}

	public async save() {
		const data = this.reactiveForm.value;
		let dataToSend = {
			name: data["name"],
			type: data["type"],
			content: data["content"],
			is_publish: data["isPublish"],
		};

		if (this.isCreateMode()) {
			const termConditionCreated: TermCondition = await this.termConditionService.createTermAndCondition(
				dataToSend
			);

			this.notificationsService.success({
				title: "El Termino y Condicion fue creado exitosamente",
				message: `El Termino y Condicion: ${termConditionCreated.name}, fue creada con exito!`,
			});
		} else {
			const termConditionUpdated: TermCondition = await this.termConditionService.updateTermAndCondition(
				dataToSend,
				this.termCondition.id
			);

			this.notificationsService.success({
				title: "El Termino y Condicion fue actualizado exitosamente",
				message: `El Termino y Condicion: ${termConditionUpdated.name}, fue actualizado con exito!`,
			});
		}

		this.modalService.emitData({ shouldReload: true });
		this.modalService.close();
	}

	public async delete() {
		const termConditionDeleted = await this.termConditionService.deleteTermAndCondition(
			this.termCondition.id
		);

		this.notificationsService.success({
			title: "El Termino y Condición fue eliminado con exito!",
			message: `El Termino y Condición ${termConditionDeleted.name}, fue eliminado con exito!`,
		});

		this.modalService.emitData({ shouldReload: true });
		this.modalService.close();
	}
}
