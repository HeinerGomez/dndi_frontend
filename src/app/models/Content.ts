import { Model } from "./Model";
export class Content extends Model {
	private _id: number;
	private _title: string;
	private _moduleId: number;
	private _content: string;

	constructor(data?: any) {
		super();
		if (data) {
			this.serialize(data);
		}
	}

	public serialize(data: any) {
		this._id = data["id"];
		this._title = data["title"];
		this._moduleId = data["module_id"];
		this._content = data["content"];
	}

	public deserialize() {
		return {
			id: this._id,
			title: this._title,
			moduleId: this._moduleId,
			content: this._content,
		};
	}

	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	public get title(): string {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

	public get moduleId(): number {
		return this._moduleId;
	}

	public set moduleId(value: number) {
		this._moduleId = value;
	}

	public get content(): string {
		return this._content;
	}

	public set content(value: string) {
		this._content = value;
	}
}
