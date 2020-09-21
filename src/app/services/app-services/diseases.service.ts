import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Disease } from "../../models/Disease";
import { Language } from "../../models/Language";

@Injectable({
	providedIn: "root",
})
export class DiseasesService {
	constructor(private http: HttpClient) {}

	public async getDependencies() {
		const response = await this.http
			.get(`${environment.apiURL}/disease/dependencies`)
			.toPromise();

		const data: any[] = response["data"];
		const languages: Language[] = [];

		if (data["languages"]) {
			const languagesRaw: any[] = data["languages"];

			languagesRaw.map((row) => {
				languages.push(new Language(row));
			});
		}

		return { languages: languages };
	}

	public async getDiseases() {
		const response = await this.http
			.get(`${environment.apiURL}/diseases`)
			.toPromise();

		const data: any[] = response["data"];
		const diseases: Disease[] = [];

		if (data.length > 0) {
			data.map((row) => diseases.push(new Disease(row)));
		}

		return diseases;
	}

	public async createDisease(body: any) {
		const response = await this.http
			.post(`${environment.apiURL}/diseases`, body)
			.toPromise();

		return new Disease(response["data"]);
	}

	public async updateDisease(body: any, diseaseId: number) {
		const response = await this.http
			.put(`${environment.apiURL}/diseases/${diseaseId}`, body)
			.toPromise();

		return new Disease(response["data"]);
	}

	public async deleteDisease(diseaseId: number) {
		const response = await this.http
			.delete(`${environment.apiURL}/diseases/${diseaseId}`)
			.toPromise();

		return new Disease(response["data"]);
	}
}
