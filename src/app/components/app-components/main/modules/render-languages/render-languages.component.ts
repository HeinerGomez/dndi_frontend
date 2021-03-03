import { Component, OnInit } from "@angular/core";
import { Language } from "../../../../../models/Language";
import { DiseasesService } from "../../../../../services/app-services/diseases.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ShareDataService } from "../../../../../services/shared/share-data.service";
import { NavigationRibbonConfig } from "../../../../shared/navigation-ribbon/navigation-ribbon.component";
import { BreadCrumbCollectorService } from "../../../../../services/shared/bread-crumb-collector.service";

@Component({
	selector: "app-render-languages",
	templateUrl: "./render-languages.component.html",
	styleUrls: ["./render-languages.component.sass"],
})
export class RenderLanguagesComponent implements OnInit {
	public languages: Language[];
	private diseaseId: number;
	public navigationRibbonConfig: NavigationRibbonConfig = {
		rootUrl: "modules/render-diseases",
	};

	constructor(
		private diseasesServices: DiseasesService,
		private router: Router,
		private shareDataServices: ShareDataService,
		private route: ActivatedRoute,
		private breadCrumbCollectorService: BreadCrumbCollectorService
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
		this.setupBreadCrumbCollector(language);
		this.router.navigate([`modules/module/0/${language.id}/${this.diseaseId}`]);
	}

	private setupBreadCrumbCollector(language: Language) {
		this.breadCrumbCollectorService.collect({
			key: language.id.toString(),
			label: language == undefined || language == null ? " " : language.name,
			toNavigate: `modules/module/0/${language.id}/${this.diseaseId}`,
		});
	}
}
