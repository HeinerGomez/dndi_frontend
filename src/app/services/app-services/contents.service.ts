import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Content } from "../../models/Content";

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
}
