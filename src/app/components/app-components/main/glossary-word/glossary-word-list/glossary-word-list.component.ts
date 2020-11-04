import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GlossaryWord } from "../../../../../models/GlossaryWord";
import { ModalService } from "../../../../../services/shared/modal.service";
import { NotificationsService } from "../../../../../services/shared/notifications.service";
import { GlossaryWordService } from "../../../../../services/app-services/glossary-word-service";
import { FormGlossaryWordComponent } from "../form-glossary-word/form-glossary-word.component";

@Component({
	selector: "app-glossary-word-list",
	templateUrl: "./glossary-word-list.component.html",
	styleUrls: ["./glossary-word-list.component.sass"],
})
export class GlossaryWordListComponent implements OnInit {
	public reactiveForm: FormGroup;
	public glossaryWords: GlossaryWord[];
	private glossaryWordsWithoutFilter: GlossaryWord[];

	constructor(
		private modalService: ModalService,
		private formBuilder: FormBuilder,
		private notificationsService: NotificationsService,
		private glossaryWordService: GlossaryWordService
	) {
		this.glossaryWords = [];
		this.glossaryWordsWithoutFilter = [];
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
		this.glossaryWords = await this.glossaryWordService.getGlossaryWord();
		this.glossaryWordsWithoutFilter = this.glossaryWords;
	}

	public searchGlossaryWord(): void {
		const searchTermControl = this.getcontrol("searchTerm");

		if (searchTermControl.valid) {
			const searchTermValue: string = searchTermControl.value;

			this.glossaryWords = this.glossaryWordsWithoutFilter.filter(
				(glossaryWord: GlossaryWord) =>
					glossaryWord.title
						.toLowerCase()
						.startsWith(searchTermValue.toLowerCase())
			);
		}
	}

	public restartSearch(): void {
		this.getcontrol("searchTerm").reset();
		this.glossaryWords = this.glossaryWordsWithoutFilter;
	}

	public getcontrol(control: string) {
		return this.reactiveForm.get(control);
	}

	public openModal(glossaryWord: GlossaryWord) {
		const title = glossaryWord ? "Editar Palabra" : "Crear Palabra";

		this.modalService.open({
			component: FormGlossaryWordComponent, // TODO create component
			title: title,
			size: "modal-xl",
			params: {
				isForCreate: glossaryWord ? false : true,
				glossaryWord: glossaryWord ? glossaryWord : null,
			},
		});

		this.modalService.watchData().subscribe((data: any) => {
			if (data && data.shouldReload) {
				this.renderView();
				this.modalService.resetEmitData();
			}
		});
	}

	public async delete(glossaryWord: GlossaryWord) {
		const glossaryWordDeleted = await this.glossaryWordService.deleteGlossaryWord(
			glossaryWord.id
		);

		this.notificationsService.success({
			title: "Palabra eliminada exitosamente",
			message: `La Palabra: ${glossaryWordDeleted.title}, fue eliminada con exito!`,
		});

		this.renderView();
	}
}
