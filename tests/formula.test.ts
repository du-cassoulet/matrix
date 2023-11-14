import { test, expect } from "bun:test";
import Formula from "../src/Formula";

const formula1 = new Formula("2(ij)² * 3", { i: 3, j: 6 });
const formula2 = new Formula("4i + 7ij²", { i: 2, j: 8 });

test("formula1", () => {
	expect(formula1.evaluate()).toBe(1944);
});

test("formula2", () => {
	expect(formula2.evaluate()).toBe(904);
});
