import { Model } from "./Model";
import { Question } from "./Question";
export class SelfEvaluation extends Model {
	private _id?: number;
	private _name: string;
	private _status: number;
	private _questions: Question[];

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
		if (data["questions"]) {
			let questions: [] = data["questions"];
			this._questions = questions.map((row) => new Question(row));
		} else {
			this._questions = [];
		}
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

	public get questions() {
		return this._questions;
	}

	public set questions(value: Question[]) {
		this._questions = value;
	}
}
