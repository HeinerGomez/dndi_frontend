export class Module {
	private _id: number;
	private _moduleId?: number;
	private _title: string;
	private _pathImage?: string;
	private _diseaseId: number;
	private _languageId: number;

	constructor(data?: any) {
		if (data) {
			this.build(data);
		}
	}

	private build(data: any) {
		this._id = data["id"];
		this._moduleId = data["module_id"];
		this._title = data["title"];
		this._pathImage = data["path_image"];
		this._diseaseId = data["disease_id"];
		this._languageId = data["language_id"];
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

	public get pathImage(): string {
		return this._pathImage;
	}

	public set pathImage(value: string) {
		this._pathImage = value;
	}

	public get disease(): number {
		return this._diseaseId;
	}

	public set disease(value: number) {
		this._diseaseId = value;
	}

	public get languageId(): number {
		return this._languageId;
	}

	public set languageId(value: number) {
		this._languageId = value;
	}
}
