import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { RepositoryImage } from "../../models/RepositoryImage";

@Injectable({
	providedIn: "root",
})
export class RepositoryImagesService {
	constructor(private http: HttpClient) {}

	public async getImages() {
		const response = await this.http
			.get(`${environment.apiURL}/repositoryImages`)
			.toPromise();

		const data: any[] = response["data"];
		const repositoryImages: RepositoryImage[] = [];

		if (data.length > 0) {
			data.map((row) => repositoryImages.push(new RepositoryImage(row)));
		}

		return repositoryImages;
	}

	public async createImage(body: any) {
		const response = await this.http
			.post(`${environment.apiURL}/repositoryImages`, body)
			.toPromise();

		return new RepositoryImage(response["data"]);
	}

	public async updateImage(body: any, repositoryImageId: number) {
		const response = await this.http
			.put(`${environment.apiURL}/repositoryImages/${repositoryImageId}`, body)
			.toPromise();

		return new RepositoryImage(response["data"]);
	}

	public async deleteImage(repositoryImageId: number) {
		const response = await this.http
			.delete(`${environment.apiURL}/repositoryImages/${repositoryImageId}`)
			.toPromise();

		return new RepositoryImage(response["data"]);
	}

	public async uploadImage(data: any, repositoryImageId: number) {
		const response: any = await this.http
			.post(
				`${environment.apiURL}/repositoryImage/loadImage/${repositoryImageId}`,
				data
			)
			.toPromise();

		return new RepositoryImage(response.data);
	}
}
