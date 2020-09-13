import { Component, OnInit } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { ActivatedRoute, Router } from "@angular/router";
import { Content } from "../../../../models/Content";
import { ShareDataService } from "../../../../services/shared/share-data.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Module } from "../../../../models/Module";
import { ContentsService } from "../../../../services/app-services/contents.service";
import { NotificationsService } from "../../../../services/shared/notifications.service";

@Component({
	selector: "app-generate-content",
	templateUrl: "./generate-content.component.html",
	styleUrls: ["./generate-content.component.sass"],
})
export class GenerateContentComponent implements OnInit {
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
		toolbarHiddenButtons: [[], ["insertImage", "insertVideo"]],
	};

	public content: Content = null;
	public reactiveForm: FormGroup;
	public module: Module;
	public moduleId: number;
	private _isForCreate: boolean;
	public possibleLinkModules: Module[];

	constructor(
		private shareDataService: ShareDataService,
		private formBuilder: FormBuilder,
		private contentsService: ContentsService,
		private route: ActivatedRoute,
		private notificationsService: NotificationsService,
		private router: Router
	) {
		this.content = this.shareDataService.data.content;
		this._isForCreate = this.shareDataService.data.isForCreate;
		this.module = null;
		this.possibleLinkModules = [];
	}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.moduleId = parseInt(params["moduleId"]);
		});
		this.getDependencies();
		this.reactiveForm = this.defineReactiveForm();
	}

	private defineReactiveForm(): FormGroup {
		return this.formBuilder.group({
			title: [
				this.content == null ? "" : this.content.title,
				[Validators.required],
			],
			moduleId: [this.moduleId, [Validators.required]],
			moduleTitle: ["", [Validators.required]],
			linkContentsIds: null,
			content: [
				this.content == null ? "" : this.content.content,
				[Validators.required],
			],
		});
	}

	private async getDependencies() {
		const data = await this.contentsService.getDependencies(this.moduleId);

		this.module = data.module;
		this.reactiveForm.get("moduleTitle").setValue(this.module.title);

		this.possibleLinkModules = data.possibleLinkModules;

		let idsLinksModules: number[] = [];
		this.possibleLinkModules.map((linkModule) => {
			if (linkModule.contentId != null) {
				idsLinksModules.push(linkModule.id);
			}
		});

		if (idsLinksModules.length > 0) {
			this.reactiveForm.get("linkContentsIds").setValue(idsLinksModules);
		}
	}

	public isForCreate(): boolean {
		return this._isForCreate;
	}

	public async save() {
		const data: any = this.transformData();

		console.log("data transform: ", data);

		if (this.isForCreate()) {
			const contentCreated: Content = await this.contentsService.createContent(
				data
			);

			this.notificationsService.success({
				title: "Contenido generado exitosamente",
				message: `El contenido: ${contentCreated.title}, fue creado con exito!`,
			});
		} else {
			const contentUpdated: Content = await this.contentsService.updateContent(
				data,
				this.content.id
			);

			this.notificationsService.success({
				title: "Contenido actualizado exitosamente",
				message: `El contenido: ${contentUpdated.title}, fue actualizado con exito!`,
			});
		}

		this.router.navigate(["/modules/module/0"]);
	}

	private transformData(): any {
		const data: any = {};
		const dataForm: any = this.reactiveForm.value;

		console.log("DataForm: ", dataForm);

		data.module_id = dataForm["moduleId"];
		data.title = dataForm["title"];
		if (
			dataForm["linkContentsIds"] != null &&
			dataForm["linkContentsIds"].length > 0
		) {
			data.linkContentsIds = dataForm["linkContentsIds"];
		}
		data.content = dataForm["content"];

		return data;
	}
}
