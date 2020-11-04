import { Model } from "./Model";
export class GlossaryWord extends Model {
	private _id?: number;
	private _title: string;
	private _status: number;
	private _description: string;

	constructor(data?: any) {
		super();
		if (data) {
			this.serialize(data);
		}
	}

	public serialize(data: any) {
		this._id = data["id"];
		this._title = data["title"];
		this._status = data["status"];
		this._description = data["description"];
	}

	public get id() {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	public get title() {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

	public get status() {
		return this._status;
	}

	public set status(value: number) {
		this._status = value;
	}

	public get description() {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}
}
