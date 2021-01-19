import { Model } from "./Model";
import { LinkMap } from "./LinkMap";
export class Content extends Model {
	private _id: number;
	private _title: string;
	private _moduleId: number;
	private _content: string;
	private _linkMaps: LinkMap[];

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

		if (data["link_maps"]) {
			data["link_maps"] = JSON.parse(data["link_maps"]);

			if (data["link_maps"].length > 0) {
				this._linkMaps = data["link_maps"].map((row: any) => new LinkMap(row));
			}
		} else {
			this._linkMaps = [];
		}
	}

	public deserialize() {
		return {
			id: this._id,
			title: this._title,
			moduleId: this._moduleId,
			content: this._content,
			linkMaps: this._linkMaps,
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

	public get linkMaps(): LinkMap[] {
		return this._linkMaps;
	}

	public set linkMaps(value: LinkMap[]) {
		this._linkMaps = value;
	}
}
