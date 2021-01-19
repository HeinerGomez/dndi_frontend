import { Component, OnInit } from "@angular/core";
import { Language } from "../../../../../models/Language";
import { DiseasesService } from "../../../../../services/app-services/diseases.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ShareDataService } from "../../../../../services/shared/share-data.service";

@Component({
	selector: "app-render-languages",
	templateUrl: "./render-languages.component.html",
	styleUrls: ["./render-languages.component.sass"],
})
export class RenderLanguagesComponent implements OnInit {
	public languages: Language[];
	private diseaseId: number;

	constructor(
		private diseasesServices: DiseasesService,
		private router: Router,
		private shareDataServices: ShareDataService,
		private route: ActivatedRoute
	) {
		this.languages = [];
	}

	async ngOnInit() {
		this.route.params.subscribe((params) => {
			this.diseaseId = params["diseaseId"];
		});

		const dependencies = await this.diseasesServices.getLanguagesOfDisease(
			this.diseaseId
		);
		this.languages = dependencies["languages"];
	}

	public enterLanguage(language: Language) {
		this.shareDataServices.data = { language: language };
		this.router.navigate(["modules/module/0"]);
	}
}
