import { Model, Pivot } from "./Model";
export class Language extends Model {
	private _id?: number;
	private _name: string;
	private _status: number;
	private _pivot?: Pivot;

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

		if (data["pivot"]) {
			this._pivot = {
				masterId: data["pivot"]["disease_id"],
				slaveId: data["pivot"]["language_id"],
			};
		}
	}

	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	public get status(): number {
		return this._status;
	}

	public set status(value: number) {
		this._status = value;
	}

	public get pivot(): Pivot {
		return this._pivot;
	}

	public set pivot(value: Pivot) {
		this._pivot = value;
	}
}
