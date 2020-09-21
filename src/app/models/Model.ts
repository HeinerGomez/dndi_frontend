export abstract class Model {
	serialize(data: any): void {}

	deserialize(): any {}

	static deserializeFromData(data: any): any {}
}

export interface Pivot {
	masterId: number;
	slaveId: number;
}
