type Variables = { [key: string]: number };

export default class Formula {
	private formula: string;
	private variables: Variables;

	public constructor(formula: string, variables: Variables) {
		this.formula = formula;
		this.variables = variables;
	}

	public evaluate() {
		const formula = this.formula
			.replace(/\s+/g, "")
			.replace(/(\d+)([a-zA-Z])/g, "$1*$2")
			.replace(/([a-zA-Z])(\d+)/g, "$1*$2")
			.replace(/([a-zA-Z])([a-zA-Z])/g, "$1*$2")
			.replace(/(\d+)(\()/g, "$1*$2")
			.replace(/(\))(\d+)/g, "$1*$2")
			.replace(/(\))(\()/g, "$1*$2")
			.replace(/²/g, "**2");

		const variableNames = Object.keys(this.variables);
		const variableValues = Object.values(this.variables);

		const formulaWithValues = variableNames.reduce(
			(acc, name, i) =>
				acc.replace(new RegExp(name, "g"), variableValues[i].toString()),
			formula
		);

		return eval(formulaWithValues);
	}
}
