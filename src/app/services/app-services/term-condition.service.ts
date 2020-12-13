import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TermCondition } from "../../models/TermCondition";
import { environment } from "@environments/environment";

@Injectable({
	providedIn: "root",
})
export class TermConditionService {
	constructor(private http: HttpClient) {}

	public async getTermAndConditions() {
		const response = await this.http
			.get(`${environment.apiURL}/termConditions`)
			.toPromise();

		const data: any[] = response["data"];
		const termConditions: TermCondition[] = [];

		data.map((row) => termConditions.push(new TermCondition(row)));

		return termConditions;
	}

	public async createTermAndCondition(dataToSend: any) {
		const response = await this.http
			.post(`${environment.apiURL}/termConditions`, dataToSend)
			.toPromise();

		const data: any = response["data"];
		const termCondition = new TermCondition(data);

		return termCondition;
	}

	public async updateTermAndCondition(
		dataToSend: any,
		termConditionId: number
	) {
		const response = await this.http
			.put(
				`${environment.apiURL}/termConditions/${termConditionId}`,
				dataToSend
			)
			.toPromise();

		const data: any = response["data"];
		const termCondition = new TermCondition(data);

		return termCondition;
	}

	public async deleteTermAndCondition(termConditionId: number) {
		const response = await this.http
			.delete(`${environment.apiURL}/termConditions/${termConditionId}`)
			.toPromise();

		const data: any = response["data"];
		const termCondition = new TermCondition(data);

		return termCondition;
	}
}
