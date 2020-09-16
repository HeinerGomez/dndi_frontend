import { Injectable } from "@angular/core";
import { NavigationRibbonData } from "../../components/shared/navigation-ribbon/navigation-ribbon.component";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class BreadCrumbCollectorService {
	private _navigationRibbonData: NavigationRibbonData[];
	private _gatherer: BehaviorSubject<
		NavigationRibbonData[]
	> = new BehaviorSubject<NavigationRibbonData[]>([]);

	constructor() {
		this._navigationRibbonData = [];
	}

	public collect(breadCrumb: NavigationRibbonData) {
		const findedBreadCrumb: NavigationRibbonData = this.findBreadCrumb(
			breadCrumb.key
		);
		if (findedBreadCrumb == null || findedBreadCrumb == undefined) {
			this._navigationRibbonData.push(breadCrumb);
			this._gatherer.next(this._navigationRibbonData);
		}
	}

	public setCollection(navigationRibbonData: NavigationRibbonData[]) {
		this._gatherer.next(navigationRibbonData);
	}

	private findBreadCrumb(key: string) {
		return this._navigationRibbonData.find(
			(breadCrumb) => breadCrumb.key == key
		);
	}

	public informCollection(): Observable<NavigationRibbonData[]> {
		return this._gatherer.asObservable();
	}

	public restartCollection(): void {
		this._navigationRibbonData = [];
		this._gatherer.next(this._navigationRibbonData);
	}
}
