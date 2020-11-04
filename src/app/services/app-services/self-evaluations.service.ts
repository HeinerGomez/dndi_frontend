import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { SelfEvaluation } from "../../models/SelfEvaluation";

@Injectable({
	providedIn: "root",
})
export class SelfEvaluationsService {
	constructor(private http: HttpClient) {}

	public async getSelfEvaluations() {
		const response = await this.http
			.get(`${environment.apiURL}/selfEvaluations`)
			.toPromise();

		const data: any[] = response["data"];
		const selfEvaluations: SelfEvaluation[] = [];

		if (data.length > 0) {
			data.map((row) => selfEvaluations.push(new SelfEvaluation(row)));
		}

		return selfEvaluations;
	}

	public async createSelfEvaluation(body: any) {
		const response = await this.http
			.post(`${environment.apiURL}/selfEvaluations`, body)
			.toPromise();

		return new SelfEvaluation(response["data"]);
	}

	public async updateSelfEvaluation(body: any, selfEvaluationId: number) {
		const response = await this.http
			.put(`${environment.apiURL}/selfEvaluations/${selfEvaluationId}`, body)
			.toPromise();

		return new SelfEvaluation(response["data"]);
	}

	public async deleteSelfEvaluation(selfEvaluationId: number) {
		const response = await this.http
			.delete(`${environment.apiURL}/selfEvaluations/${selfEvaluationId}`)
			.toPromise();

		return new SelfEvaluation(response["data"]);
	}
}
