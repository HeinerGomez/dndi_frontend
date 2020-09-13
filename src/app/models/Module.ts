import { Model } from "./Model";
export class Module extends Model {
	private _id?: number;
	private _moduleId?: number;
	private _title: string;
	private _description?: string;
	private _isContentLink: number;
	private _contentId: number;
	private _pathImage?: string;
	private _diseaseId: number;
	private _languageId: number;

	constructor(data?: any) {
		super();
		if (data) {
			this.serialize(data);
		}
	}

	public serialize(data: any) {
		this._id = data["id"];
		this._moduleId = data["module_id"];
		this._title = data["title"];
		this._description = data["description"];
		this._contentId = data["content_id"];
		this._isContentLink = data["is_content_link"];
		this._pathImage = data["path_image"];
		this._diseaseId = data["disease_id"];
		this._languageId = data["language_id"];
	}

	public deserialize() {
		return {
			id: this._id,
			module_id: this._moduleId,
			title: this._title,
			description: this._description,
			path_image: this._pathImage,
			disease_id: this._diseaseId,
			language_id: this._languageId,
		};
	}

	public static deserializeFromData(data: any) {
		const transformData: any = {};

		if (data["id"]) {
			transformData.id = data["id"];
		}

		if (data["moduleId"]) {
			transformData.module_id = data["moduleId"];
		}

		if (data["title"]) {
			transformData.title = data["title"];
		}

		if (data["description"]) {
			transformData.description = data["description"];
		}

		if (data["isContentLink"]) {
			transformData.is_content_link = data["isContentLink"];
		}

		if (data["contentId"]) {
			transformData.content_id = data["contentId"];
		}

		if (data["pathImage"]) {
			transformData.path_image = data["pathImage"];
		}

		if (data["diseaseId"]) {
			transformData.disease_id = data["diseaseId"];
		}

		if (data["languageId"]) {
			transformData.language_id = data["languageId"];
		}

		return transformData;
	}

	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	public get moduleId(): number {
		return this._moduleId;
	}

	public set moduleId(value: number) {
		this.moduleId = value;
	}

	public get title(): string {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}

	public get isContentLink(): number {
		return this._isContentLink;
	}

	public set isContentLink(value: number) {
		this._isContentLink = value;
	}

	public get contentId(): number {
		return this._contentId;
	}

	public set contentId(value: number) {
		this._contentId = value;
	}

	public get pathImage(): string {
		return this._pathImage;
	}

	public set pathImage(value: string) {
		this._pathImage = value;
	}

	public get diseaseId(): number {
		return this._diseaseId;
	}

	public set diseaseId(value: number) {
		this._diseaseId = value;
	}

	public get languageId(): number {
		return this._languageId;
	}

	public set languageId(value: number) {
		this._languageId = value;
	}
}
