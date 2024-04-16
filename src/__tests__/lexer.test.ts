import { TOKEN_TYPE } from "../const.js";
import { createToken, handleNumber, handleString, lexer } from "../lexer.js";
import { describe, it, expect } from "vitest";

describe("createToken", () => {
	it("returns valid token", () => {
		const token = createToken(TOKEN_TYPE.STRING, "camiha");
		expect(token).toEqual({ type: "STRING", value: "camiha" });
	});
});

describe("handleNumber", () => {
	it("return a valid token", () => {
		const { token, nextIndex } = handleNumber({
			input: "123",
			startIndex: 0,
		});
		expect(token).toEqual({ type: "NUMBER", value: 123 });
		expect(nextIndex).toBe(3);
	});

	it("return a valid token with negative number", () => {
		const { token, nextIndex } = handleNumber({
			input: "-123",
			startIndex: 0,
		});
		expect(token).toEqual({ type: "NUMBER", value: -123 });
		expect(nextIndex).toBe(4);
	});
});

describe("handleString", () => {
	it("return a valid token", () => {
		const { token, nextIndex } = handleString({
			input: '"camiha"',
			startIndex: 0,
		});
		expect(token).toEqual({ type: "STRING", value: "camiha" });
		expect(nextIndex).toBe(7);
	});

	it("return a valid token with escape", () => {
		const { token, nextIndex } = handleString({
			input: '"camiha\\""',
			startIndex: 0,
		});
		expect(token).toEqual({ type: "STRING", value: 'camiha"' });
		expect(nextIndex).toBe(9);
	});
});

describe("lexer", () => {
	it("return a valid token", () => {
		const tokens = lexer('{"name":"camiha","age":27}');
		expect(tokens).toEqual([
			{ type: "LEFT_BRACE", value: undefined },
			{ type: "STRING", value: "name" },
			{ type: "COLON", value: undefined },
			{ type: "STRING", value: "camiha" },
			{ type: "COMMA", value: undefined },
			{ type: "STRING", value: "age" },
			{ type: "COLON", value: undefined },
			{ type: "NUMBER", value: 18 },
			{ type: "RIGHT_BRACE", value: undefined },
		]);
	});
});
