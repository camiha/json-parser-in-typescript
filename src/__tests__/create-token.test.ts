import { createToken } from "../lexer.js";
import { TOKEN_TYPE } from "../const.js";
import { describe, expect, it } from "vitest";

describe("createToken", () => {
	it("creates a LEFT_BRACE token", () => {
		const leftBrace = createToken(TOKEN_TYPE.LEFT_BRACE, "{");
		expect(leftBrace).toEqual({
			type: TOKEN_TYPE.LEFT_BRACE,
			value: "{",
		});
	});

	it("creates a RIGHT_BRACE token", () => {
		const rightBrace = createToken(TOKEN_TYPE.RIGHT_BRACE, "}");
		expect(rightBrace).toEqual({
			type: TOKEN_TYPE.RIGHT_BRACE,
			value: "}",
		});
	});

	it("creates a LEFT_BRACKET token", () => {
		const leftBracket = createToken(TOKEN_TYPE.LEFT_BRACKET, "[");
		expect(leftBracket).toEqual({
			type: TOKEN_TYPE.LEFT_BRACKET,
			value: "[",
		});
	});

	it("creates a RIGHT_BRACKET token", () => {
		const rightBracket = createToken(TOKEN_TYPE.RIGHT_BRACKET, "]");
		expect(rightBracket).toEqual({
			type: TOKEN_TYPE.RIGHT_BRACKET,
			value: "]",
		});
	});

	it("creates a COLON token", () => {
		const colon = createToken(TOKEN_TYPE.COLON, ":");
		expect(colon).toEqual({
			type: TOKEN_TYPE.COLON,
			value: ":",
		});
	});

	it("creates a COMMA token", () => {
		const comma = createToken(TOKEN_TYPE.COMMA, ",");
		expect(comma).toEqual({
			type: TOKEN_TYPE.COMMA,
			value: ",",
		});
	});

	it("creates a STRING token", () => {
		const string = createToken(TOKEN_TYPE.STRING, '"string"');
		expect(string).toEqual({
			type: TOKEN_TYPE.STRING,
			value: '"string"',
		});
	});

	it("creates a NUMBER token", () => {
		const number = createToken(TOKEN_TYPE.NUMBER, "123");
		expect(number).toEqual({
			type: TOKEN_TYPE.NUMBER,
			value: "123",
		});
	});

	it("creates a BOOLEAN token", () => {
		const _true = createToken(TOKEN_TYPE.TRUE, "true");
		const _false = createToken(TOKEN_TYPE.FALSE, "false");
		expect(_true).toEqual({
			type: TOKEN_TYPE.TRUE,
			value: "true",
		});
		expect(_false).toEqual({
			type: TOKEN_TYPE.FALSE,
			value: "false",
		});
	});

	it("creates a NULL token", () => {
		const _null = createToken(TOKEN_TYPE.NULL, "null");
		expect(_null).toEqual({
			type: TOKEN_TYPE.NULL,
			value: "null",
		});
	});

	it("creates a token with no value", () => {
		const leftBrace = createToken(TOKEN_TYPE.LEFT_BRACE);
		expect(leftBrace).toEqual({
			type: TOKEN_TYPE.LEFT_BRACE,
			value: undefined,
		});
	});
});
