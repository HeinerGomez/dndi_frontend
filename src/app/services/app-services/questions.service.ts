import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Question } from "../../models/Question";

@Injectable({
	providedIn: "root",
})
export class QuestionsService {
	constructor(private http: HttpClient) {}

	public async getQuestionsBySelfEvaluationId(selfEvaluationId: number) {
		const response = await this.http
			.get(`${environment.apiURL}/selfEvaluations/${selfEvaluationId}`)
			.toPromise();

		const data: any[] = response["data"]["questions"];
		const questions: Question[] = [];

		if (data.length > 0) {
			data.map((row) => questions.push(new Question(row)));
		}

		return questions;
	}

	public async createQuestion(body: any) {
		const response = await this.http
			.post(`${environment.apiURL}/questions`, body)
			.toPromise();

		return new Question(response["data"]);
	}

	public async updateQuestion(body: any, questionId: number) {
		const response = await this.http
			.put(`${environment.apiURL}/questions/${questionId}`, body)
			.toPromise();

		return new Question(response["data"]);
	}

	public async deleteQuestion(questionId: number) {
		const response = await this.http
			.delete(`${environment.apiURL}/questions/${questionId}`)
			.toPromise();

		return new Question(response["data"]);
	}
}
