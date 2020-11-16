import { Model } from "./Model";

export class Answer extends Model {
	private _id: number;
	private _name: string;
	private _tag: string;
	private _isValid: boolean;

	constructor(data?: any) {
		super();
		if (data) {
			this.serialize(data);
		}
	}

	public serialize(data: any) {
		this._id = data["id"];
		this._name = data["name"];
		this._tag = data["tag"];
		this._isValid = data["is_valid"] == 1 ? true : false;
	}

	public deserialize(): any {
		return {
			id: this._id,
			name: this._name,
			tag: this._tag,
			is_valid: this._isValid,
		};
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

	public get tag() {
		return this._tag;
	}

	public set tag(value: string) {
		this._tag = value;
	}

	public get isValid() {
		return this._isValid;
	}

	public set isValid(value: boolean) {
		this._isValid = value;
	}
}
