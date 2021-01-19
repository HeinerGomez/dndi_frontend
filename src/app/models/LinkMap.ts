import { Model } from "./Model";

export class LinkMap extends Model {
	private _id: number;
	private _name: string;
	private _pageName: string;

	constructor(data?: any) {
		super();
		if (data) {
			this.serialize(data);
		}
	}

	public serialize(data: any) {
		this._id = data["id"];
		this._name = data["name"];
		this._pageName = data["page_name"];
	}

	public deserialize(): any {
		return {
			id: this._id,
			name: this._name,
			page_name: this._pageName,
		};
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

	public get pageName(): string {
		return this._pageName;
	}

	public set pageName(value: string) {
		this.pageName = value;
	}
}
