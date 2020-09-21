import { Model } from "./Model";
import { Language } from "./Language";
export class Disease extends Model {
	private _id?: number;
	private _name: string;
	private _description: string;
	private _languages?: Language[];

	constructor(data?: any) {
		super();
		if (data) {
			this.serialize(data);
		}
	}

	public serialize(data: any) {
		this._id = data["id"];
		this._name = data["name"];
		this._description = data["description"];

		if (data["languages"]) {
			const languanges: any[] = data["languages"];
			this._languages = languanges.map((row) => new Language(row));
		}
	}

	public deserialize() {
		const deserializeData = {
			id: this._id,
			name: this._name,
			description: this._description,
			languages: [],
		};

		for (const language of this._languages) {
			deserializeData.languages.push(language.pivot.slaveId);
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

	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}

	public get languages(): Language[] {
		return this._languages;
	}

	public set languages(value: Language[]) {
		this._languages = value;
	}
}
