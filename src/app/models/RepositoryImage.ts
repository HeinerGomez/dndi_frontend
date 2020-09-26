import { Model } from "./Model";
import { environment } from "../../environments/environment";

export class RepositoryImage extends Model {
	private _id?: number;
	private _title: string;
	private _path: string;
	private _key: string;

	constructor(data?: any) {
		super();
		if (data) {
			this.serialize(data);
		}
	}

	public serialize(data: any) {
		this._id = data["id"];
		this._title = data["title"];
		this._path = data["path"];
		this._key = data["key"];
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

	public get path(): string {
		return this._path;
	}

	public set path(value: string) {
		this._path = value;
	}

	public get key(): string {
		return this._key;
	}

	public set key(value: string) {
		this._key = value;
	}
}
