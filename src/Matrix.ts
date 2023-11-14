export default class Matrix {
	public static create(
		height: number,
		width: number,
		formula: (i: number, j: number) => number
	) {
		if (height <= 0 || width <= 0)
			throw new Error("Height and width must be greater than 0");

		const data = new Array(height)
			.fill(0)
			.map((_, i) =>
				new Array(width).fill(0).map((_, j) => formula(i + 1, j + 1))
			);

		return new Matrix(data);
	}

	public static fromObject(obj: any) {
		return new Matrix(obj.data);
	}

	public static fromArray(arr: number[][]) {
		return new Matrix(arr);
	}

	public static squared(n: number) {
		const data = new Array(n)
			.fill(0)
			.map((_, i) => new Array(n).fill(0).map((_, j) => i * n + j + 1));

		return new Matrix(data);
	}

	public static identity(n: number) {
		const data = new Array(n)
			.fill(0)
			.map((_, i) => new Array(n).fill(0).map((_, j) => (i === j ? 1 : 0)));

		return new Matrix(data);
	}

	public static zero(i: number, j: number) {
		const data = new Array(i).fill(0).map((_) => new Array(j).fill(0));

		return new Matrix(data);
	}

	public static triangle(n: number, upper: boolean = false) {
		const data = new Array(n).fill(0).map((_, i) =>
			new Array(n).fill(0).map((_, j) => {
				if (upper) {
					return i <= j ? 1 : 0;
				}

				return i >= j ? 1 : 0;
			})
		);

		return new Matrix(data);
	}

	private data: number[][];

	public constructor(data: number[][]) {
		this.data = data;
	}

	public get height() {
		return this.data.length;
	}

	public get width() {
		return this.data[0].length;
	}

	public get(i: number, j: number) {
		return this.data[i - 1][j - 1];
	}

	public set(i: number, j: number, value: number) {
		this.data[i - 1][j - 1] = value;
	}

	public isSquared() {
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				if (this.get(i + 1, j + 1) !== i * this.width + j + 1) {
					return false;
				}
			}
		}

		return true;
	}

	public isIdentity() {
		for (let i = 1; i <= this.height; i++) {
			for (let j = 1; j <= this.width; j++) {
				const current = this.get(i, j);

				if (i === j) continue;
				if (current !== 0) return false;
			}
		}

		return true;
	}

	public isZero() {
		for (let i = 1; i <= this.height; i++) {
			for (let j = 1; j <= this.width; j++) {
				const current = this.get(i, j);

				if (current !== 0) return false;
			}
		}

		return true;
	}

	public isTriangular(upper: boolean = true) {
		for (let i = 1; i <= this.height; i++) {
			for (let j = 1; j <= this.width; j++) {
				const current = this.get(i, j);

				if (upper && i < j && current !== 0) return false;
				if (i > j && current !== 0) return false;
			}
		}

		return true;
	}

	public isInversible() {
		return this.determinant() !== 0;
	}

	public minor(i: number, j: number) {
		if (this.height !== this.width)
			throw new Error("Matrix must be square to have a minor");

		const data = new Array(this.height - 1).fill(0).map((_, k) =>
			new Array(this.width - 1).fill(0).map((_, l) => {
				const row = k + 1 < i ? k + 1 : k + 2;
				const col = l + 1 < j ? l + 1 : l + 2;

				return this.get(row, col);
			})
		);

		return new Matrix(data);
	}

	public cofactor(i: number, j: number) {
		if (this.height !== this.width)
			throw new Error("Matrix must be square to have a cofactor");

		const sign = (i + j) % 2 === 0 ? 1 : -1;

		return sign * this.minor(i, j).determinant();
	}

	public determinant() {
		if (this.height !== this.width)
			throw new Error("Matrix must be square to have a determinant");

		if (this.height === 1) {
			return this.get(1, 1);
		}

		if (this.height === 2) {
			return this.get(1, 1) * this.get(2, 2) - this.get(1, 2) * this.get(2, 1);
		}

		let result = 0;

		for (let i = 1; i <= this.height; i++) {
			const sign = i % 2 === 0 ? -1 : 1;
			const minor = this.minor(1, i);

			result += sign * this.get(1, i) * minor.determinant();
		}

		return result;
	}

	public transpose() {
		const data = new Array(this.width).fill(0).map((_, i) =>
			new Array(this.height).fill(0).map((_, j) => {
				return this.get(j + 1, i + 1);
			})
		);

		return new Matrix(data);
	}

	public add(matrix: Matrix) {
		if (this.height !== matrix.height || this.width !== matrix.width)
			throw new Error("Matrices must have the same dimensions");

		const data = new Array(this.height).fill(0).map((_, i) =>
			new Array(this.width).fill(0).map((_, j) => {
				return this.get(i + 1, j + 1) + matrix.get(i + 1, j + 1);
			})
		);

		return new Matrix(data);
	}

	public subtract(matrix: Matrix) {
		if (this.height !== matrix.height || this.width !== matrix.width)
			throw new Error("Matrices must have the same dimensions");

		const data = new Array(this.height).fill(0).map((_, i) =>
			new Array(this.width).fill(0).map((_, j) => {
				return this.get(i + 1, j + 1) - matrix.get(i + 1, j + 1);
			})
		);

		return new Matrix(data);
	}

	public multiply(matrix: Matrix) {
		if (this.width !== matrix.height)
			throw new Error("First matrix width must equal second matrix height");

		const data = new Array(this.height).fill(0).map((_, i) =>
			new Array(matrix.width).fill(0).map((_, j) => {
				return new Array(this.width)
					.fill(0)
					.map((_, k) => {
						return this.get(i + 1, k + 1) * matrix.get(k + 1, j + 1);
					})
					.reduce((acc, curr) => acc + curr, 0);
			})
		);

		return new Matrix(data);
	}

	public scalarMultiply(n: number) {
		const data = new Array(this.height).fill(0).map((_, i) =>
			new Array(this.width).fill(0).map((_, j) => {
				return this.get(i + 1, j + 1) * n;
			})
		);

		return new Matrix(data);
	}

	public inverse() {
		if (this.height !== this.width)
			throw new Error("Matrix must be square to have an inverse");

		if (this.determinant() === 0)
			throw new Error("Matrix must be inversible to have an inverse");

		const data = new Array(this.height).fill(0).map((_, i) =>
			new Array(this.width).fill(0).map((_, j) => {
				return this.cofactor(i + 1, j + 1) / this.determinant();
			})
		);

		return new Matrix(data).transpose();
	}

	public power(n: number) {
		if (n < 0) throw new Error("n must be greater than or equal to 0");
		if (this.height !== this.width)
			throw new Error("Matrix must be square to be raised to a power");

		if (n === 0) return Matrix.identity(this.height);
		let result = Matrix.identity(this.height);

		for (let i = 0; i < n; i++) {
			result = result.multiply(this);
		}

		return result;
	}

	public equals(matrix: Matrix) {
		if (this.height !== matrix.height || this.width !== matrix.width)
			return false;

		for (let i = 1; i <= this.height; i++) {
			for (let j = 1; j <= this.width; j++) {
				if (this.get(i, j) !== matrix.get(i, j)) return false;
			}
		}

		return true;
	}

	public toString() {
		return this.data.map((row) => row.join("\t")).join("\n");
	}

	public toArray() {
		return structuredClone(this.data);
	}

	public toObject() {
		return {
			height: this.height,
			width: this.width,
			data: this.toArray(),
		};
	}
}
