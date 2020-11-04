import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { GlossaryWord } from "../../models/GlossaryWord";

@Injectable({
	providedIn: "root",
})
export class GlossaryWordService {
	constructor(private http: HttpClient) {}

	public async getGlossaryWord() {
		const response = await this.http
			.get(`${environment.apiURL}/glossaryWords`)
			.toPromise();

		const data: any[] = response["data"];
		const glossaryWords: GlossaryWord[] = [];

		if (data.length > 0) {
			data.map((row) => glossaryWords.push(new GlossaryWord(row)));
		}

		console.log("Glossary Words: ", glossaryWords);

		return glossaryWords;
	}

	public async createGlossaryWord(body: any) {
		const response = await this.http
			.post(`${environment.apiURL}/glossaryWords`, body)
			.toPromise();

		return new GlossaryWord(response["data"]);
	}

	public async updateGlossaryWord(body: any, glossaryWordId: number) {
		const response = await this.http
			.put(`${environment.apiURL}/glossaryWords/${glossaryWordId}`, body)
			.toPromise();

		return new GlossaryWord(response["data"]);
	}

	public async deleteGlossaryWord(glossaryWordId: number) {
		const response = await this.http
			.delete(`${environment.apiURL}/glossaryWords/${glossaryWordId}`)
			.toPromise();

		return new GlossaryWord(response["data"]);
	}
}
