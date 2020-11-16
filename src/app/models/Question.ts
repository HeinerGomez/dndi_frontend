import { Model } from "./Model";
import { Answer } from "./Answer";

export class Question extends Model {
	private _id: number;
	private _name: string;
	private _answers: Answer[];
	private _selfEvaluationId: number;

	constructor(data?: any) {
		super();
		if (data) {
			this.serialize(data);
		}
	}

	public serialize(data: any) {
		this._id = data["id"];
		this._name = data["name"];
		if (data["data_answer"] != null && data["data_answer"] != []) {
			let dataAnswer: [] = JSON.parse(data["data_answer"]);
			this._answers = dataAnswer.map((row) => new Answer(row));
		} else {
			this._answers = [];
		}
		this._selfEvaluationId = data["self_evaluation_id"];
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

	public get answers() {
		return this._answers;
	}

	public set answers(value: Answer[]) {
		this._answers = value;
	}

	public get selfEvaluationId() {
		return this._selfEvaluationId;
	}

	public set selfEvaluationId(value: number) {
		this._selfEvaluationId = value;
	}
}
