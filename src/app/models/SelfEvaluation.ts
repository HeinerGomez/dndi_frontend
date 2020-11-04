import { Model } from "./Model";
export class SelfEvaluation extends Model {
	private _id?: number;
	private _name: string;
	private _status: number;

	constructor(data?: any) {
		super();
		if (data) {
			this.serialize(data);
		}
	}

	public serialize(data: any) {
		this._id = data["id"];
		this._name = data["name"];
		this._status = data["status"];
	}

	public get id() {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	public get name() {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	public get status() {
		return this._status;
	}

	public set status(value: number) {
		this._status = value;
	}
}
