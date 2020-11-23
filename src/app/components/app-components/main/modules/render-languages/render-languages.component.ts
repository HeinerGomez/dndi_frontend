import { Component, OnInit } from "@angular/core";
import { Language } from "../../../../../models/Language";
import { DiseasesService } from "../../../../../services/app-services/diseases.service";
import { Router } from "@angular/router";
import { ShareDataService } from "../../../../../services/shared/share-data.service";

@Component({
	selector: "app-render-languages",
	templateUrl: "./render-languages.component.html",
	styleUrls: ["./render-languages.component.sass"],
})
export class RenderLanguagesComponent implements OnInit {
	public languages: Language[];

	constructor(
		private diseasesServices: DiseasesService,
		private router: Router,
		private shareDataServices: ShareDataService
	) {
		this.languages = [];
	}

	async ngOnInit() {
		const dependencies = await this.diseasesServices.getDependencies();
		this.languages = dependencies["languages"];
	}

	public enterLanguage(language: Language) {
		this.shareDataServices.data = { language: language };
		this.router.navigate(["modules/module/0"]);
	}
}
