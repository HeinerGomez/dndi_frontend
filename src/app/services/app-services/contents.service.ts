import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Content } from "../../models/Content";
import { Module } from "../../models/Module";

@Injectable({
	providedIn: "root",
})
export class ContentsService {
	constructor(private http: HttpClient) {}

	public async getContentOfModule(moduleId: number) {
		const response = await this.http
			.get(`${environment.apiURL}/contentOfModule/${moduleId}`)
			.toPromise();

		const data: any[] = response["data"];
		let content: Content = null;

		if (data.length > 0) {
			content = new Content(data[0]);
		}

		return content;
	}

	public async getDependencies(moduleId: number) {
		const response = await this.http
			.get(`${environment.apiURL}/generate-content/dependencies/${moduleId}`)
			.toPromise();

		const data: any = response["data"];
		const module: Module = new Module(data.module);
		const possibleLinkModules: Module[] = [];

		if (data.possibleLinkModules.length > 0) {
			data.possibleLinkModules.map((row) =>
				possibleLinkModules.push(new Module(row))
			);
		}

		return { module: module, possibleLinkModules: possibleLinkModules };
	}

	public async getContent(contentId: number) {
		const response: any = await this.http
			.get(`${environment.apiURL}/contents/${contentId}`)
			.toPromise();

		return new Content(response.data);
	}

	public async createContent(data: any) {
		const response: any = await this.http
			.post(`${environment.apiURL}/contents`, data)
			.toPromise();
		return new Content(response.data);
	}

	public async updateContent(data: any, contentId: number) {
		const response: any = await this.http
			.put(`${environment.apiURL}/contents/${contentId}`, data)
			.toPromise();
		return new Content(response.data);
	}

	public async deleteContent(contentId: number) {
		const response: any = await this.http
			.delete(`${environment.apiURL}/contents/${contentId}`)
			.toPromise();

		return new Content(response.data);
	}
}
