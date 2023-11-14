import { test, expect } from "bun:test";
import Matrix from "../src/Matrix";
import Formula from "../src/Formula";

test("matrix", () => {
	const matrix = Matrix.create(3, 3, (i, j) => {
		return new Formula("i + j", { i, j }).evaluate();
	});

	expect(matrix).toStrictEqual(
		new Matrix([
			[2, 3, 4],
			[3, 4, 5],
			[4, 5, 6],
		])
	);
});

test("matrix determinant", () => {
	const matrix = Matrix.create(3, 3, (i, j) => {
		return new Formula("i + j", { i, j }).evaluate();
	});

	expect(matrix.determinant()).toBe(0);
});

test("matrix transpose", () => {
	const matrix = Matrix.create(3, 3, (i, j) => {
		return new Formula("i + j", { i, j }).evaluate();
	});

	expect(matrix.transpose()).toStrictEqual(
		new Matrix([
			[2, 3, 4],
			[3, 4, 5],
			[4, 5, 6],
		])
	);
});

test("matrix multiply", () => {
	const matrix1 = Matrix.create(3, 3, (i, j) => {
		return new Formula("i + j", { i, j }).evaluate();
	});

	const matrix2 = Matrix.create(3, 3, (i, j) => {
		return new Formula("3i + j²", { i, j }).evaluate();
	});

	expect(matrix1.multiply(matrix2)).toStrictEqual(
		new Matrix([
			[69, 96, 141],
			[90, 126, 186],
			[111, 156, 231],
		])
	);
});

test("matrix power", () => {
	const matrix = Matrix.create(3, 3, (i, j) => {
		return new Formula("i + j", { i, j }).evaluate();
	});

	expect(matrix.power(2)).toStrictEqual(
		new Matrix([
			[29, 38, 47],
			[38, 50, 62],
			[47, 62, 77],
		])
	);
});
