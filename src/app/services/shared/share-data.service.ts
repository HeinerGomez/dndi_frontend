import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class ShareDataService {
	private _data: any;

	constructor() {
		this._data = {};
	}

	public set data(data: any) {
		this._data = data;
	}

	public get data(): any {
		return this._data;
	}
}
