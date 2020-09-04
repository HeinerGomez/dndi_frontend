import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Module } from "../../models/Module";

@Injectable({
	providedIn: "root",
})
export class ModulesService {
	constructor(private http: HttpClient) {}

	public async getRootModules() {
		const response = await this.http
			.get(`${environment.apiURL}/rootModules`)
			.toPromise();

		const data: any[] = response["data"];
		const modules: Module[] = [];

		if (data.length > 0) {
			data.map((row) => modules.push(new Module(row)));
		}

		return modules;
	}
}
