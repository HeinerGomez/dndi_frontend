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

	public getLastBreadCrumb(): NavigationRibbonData {
		if (this._navigationRibbonData.length > 1) {
			return this._navigationRibbonData[this._navigationRibbonData.length - 2];
		} else {
			return null;
		}
	}

	public deleteLastBreadCrumb() {
		if (this._navigationRibbonData.length > 0) {
			this._navigationRibbonData.pop();
		}
	}

	public getFirstBreadCrumb(): NavigationRibbonData {
		if (this._navigationRibbonData.length > 0) {
			return this._navigationRibbonData[0];
		} else {
			return null;
		}
	}

	public informCollection(): Observable<NavigationRibbonData[]> {
		return this._gatherer.asObservable();
	}

	public restartCollection(): void {
		this._navigationRibbonData = [];
		this._gatherer.next(this._navigationRibbonData);
	}
}
