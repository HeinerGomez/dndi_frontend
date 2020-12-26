import { Model } from "./Model";

export enum Type {
	CIVIL_LIABILITY = 2,
	TERM_AND_CONDITION = 1,
}

export class TermCondition extends Model {
	private _id: number;
	private _name: string;
	private _type: Type;
	private _isPublish: boolean;
	private _content: string;

	constructor(data?: any) {
		super();
		if (data) {
			this.serialize(data);
		}
	}

	serialize(data: any) {
		this._id = data["id"];
		this._name = data["name"];

		if (data["type"] == 2) {
			this._type = Type.CIVIL_LIABILITY;
		} else {
			this._type = Type.TERM_AND_CONDITION;
		}

		this._isPublish = data["is_publish"];
		this._content = data["content"];
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

	public get type(): Type {
		return this._type;
	}

	public get typeAsName(): string {
		return this._type == Type.CIVIL_LIABILITY
			? "Políticas de privacidad y manejo de datos"
			: "política de responsabilidad civil";
	}

	public set type(value: Type) {
		this._type = value;
	}

	public get content() {
		return this._content;
	}

	public set content(value: string) {
		this._content = value;
	}

	public get isPublish(): boolean {
		return this._isPublish;
	}

	public get isPublishAsName(): string {
		return this._isPublish ? "Publicado" : "No Publicado";
	}

	public set isPublish(value: boolean) {
		this._isPublish = value;
	}
}
