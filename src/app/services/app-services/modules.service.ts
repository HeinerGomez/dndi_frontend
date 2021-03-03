import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Module } from "../../models/Module";

@Injectable({
	providedIn: "root",
})
export class ModulesService {
	constructor(private http: HttpClient) {}

	public async getRootModules(languageId: number, diseaseId: number) {
		const response = await this.http
			.get(`${environment.apiURL}/rootModules/${languageId}/${diseaseId}`)
			.toPromise();

		const data: any[] = response["data"];
		const modules: Module[] = [];

		if (data.length > 0) {
			data.map((row) => modules.push(new Module(row)));
		}

		return modules;
	}

	public async getChildModules(parentModuleId: number) {
		const response = await this.http
			.get(`${environment.apiURL}/childModules/${parentModuleId}`)
			.toPromise();

		const data: any[] = response["data"];
		const modules: Module[] = [];

		if (data.length > 0) {
			data.map((row) => modules.push(new Module(row)));
		}

		return modules;
	}

	public async createModule(data: any) {
		const response: any = await this.http
			.post(`${environment.apiURL}/modules`, data)
			.toPromise();
		return new Module(response.data);
	}

	public async updateModule(data: any, moduleId: number) {
		const response: any = await this.http
			.put(`${environment.apiURL}/modules/${moduleId}`, data)
			.toPromise();

		return new Module(response.data);
	}

	public async uploadImage(data: any, moduleId: number) {
		const response: any = await this.http
			.post(`${environment.apiURL}/loadImageModule/${moduleId}`, data)
			.toPromise();

		return new Module(response.data);
	}

	public async deleteModule(moduleId: number) {
		const response: any = await this.http
			.delete(`${environment.apiURL}/modules/${moduleId}`)
			.toPromise();

		return new Module(response.data);
	}
}
