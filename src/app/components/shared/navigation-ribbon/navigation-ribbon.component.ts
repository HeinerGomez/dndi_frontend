import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { BreadCrumbCollectorService } from "../../../services/shared/bread-crumb-collector.service";

@Component({
	selector: "navigation-ribbon",
	templateUrl: "./navigation-ribbon.component.html",
	styleUrls: ["./navigation-ribbon.component.sass"],
})
export class NavigationRibbonComponent implements OnInit {
	public data: NavigationRibbonData[];

	@Input("config")
	public config: NavigationRibbonConfig;

	constructor(
		private router: Router,
		private location: Location,
		private breadCrumbCollectorService: BreadCrumbCollectorService
	) {}

	ngOnInit() {
		this.breadCrumbCollectorService.informCollection().subscribe((data) => {
			this.data = data;
		});
	}

	public backNavigation(): void {
		this.data.pop();
		this.breadCrumbCollectorService.setCollection(this.data);
		this.location.back();
	}

	public navigateToHome(): void {
		this.router.navigate([this.config.rootUrl]);
		this.breadCrumbCollectorService.restartCollection();
	}

	public navigateTo(item: NavigationRibbonData) {
		this.reorganizeRoutes(item);
		this.router.navigate([item.toNavigate], {
			queryParams: item.navigationParams,
		});
	}

	private reorganizeRoutes(item: NavigationRibbonData) {
		const newData: NavigationRibbonData[] = [];

		for (let _item of this.data) {
			newData.push(_item);
			if (item.key == _item.key) {
				break;
			}
		}

		this.data = newData;
		this.breadCrumbCollectorService.setCollection(this.data);
	}
}

export interface NavigationRibbonData {
	key: string;
	label: string;
	toNavigate: string;
	navigationParams?: any;
}

export interface NavigationRibbonConfig {
	rootUrl: string;
}
