import { describe, it, expect } from "vitest";
import { lexer } from "../lexer.js";
import {
	getLiteralNodeType,
	parseLiteral,
	parsePropertyKey,
	parser,
} from "../parser.js";

describe("getLiteralNodeType", () => {
	it("returns a valid node type", () => {
		const nodeType = getLiteralNodeType("camiha");
		expect(nodeType).toBe("StringLiteral");
	});
});

describe("parseLiteral", () => {
	it("returns a valid parsed number", () => {
		const tokens = lexer("123");
		const numberToken = tokens[0];
		const number = parseLiteral(numberToken);
		expect(number).toEqual({
			type: "NumberLiteral",
			value: 123,
		});
	});

	it("returns a valid parsed string", () => {
		const tokens = lexer('"camiha"');
		const stringToken = tokens[0];
		const string = parseLiteral(stringToken);
		expect(string).toEqual({
			type: "StringLiteral",
			value: "camiha",
		});
	});
});

describe("parsePropertyKey", () => {
	it("returns a valid parsed key", () => {
		const tokens = lexer('{"name":"camiha"}');
		const keyToken = tokens[1];
		const key = parsePropertyKey(keyToken);
		expect(key).toEqual({
			type: "STRING",
			value: "name",
		});
	});
});

describe("parseObject", () => {
	it("returns a valid parsed json", () => {
		const tokens = lexer('{"name":"camiha","age":27}');
		const json = parser(tokens);
		expect(json).toEqual({
			type: "Program",
			body: [
				{
					type: "ObjectExpression",
					properties: [
						{
							type: "Property",
							key: {
								type: "STRING",
								value: "name",
							},
							value: {
								type: "StringLiteral",
								value: "camiha",
							},
						},
						{
							type: "Property",
							key: {
								type: "STRING",
								value: "age",
							},
							value: {
								type: "NumberLiteral",
								value: 27,
							},
						},
					],
				},
			],
		});
	});
});

describe("parseArray", () => {
	it("returns a valid parsed json", () => {
		const tokens = lexer("[1,2,3]");
		const json = parser(tokens);
		expect(json).toEqual({
			type: "Program",
			body: [
				{
					type: "ArrayExpression",
					elements: [
						{
							type: "NumberLiteral",
							value: 1,
						},
						{
							type: "NumberLiteral",
							value: 2,
						},
						{
							type: "NumberLiteral",
							value: 3,
						},
					],
				},
			],
		});
	});
});

describe("parser", () => {
	it("returns a valid parsed json", () => {
		const tokens = lexer('{"name":"camiha","age":27}');
		const json = parser(tokens);
		expect(json).toEqual({
			type: "Program",
			body: [
				{
					type: "ObjectExpression",
					properties: [
						{
							type: "Property",
							key: {
								type: "STRING",
								value: "name",
							},
							value: {
								type: "StringLiteral",
								value: "camiha",
							},
						},
						{
							type: "Property",
							key: {
								type: "STRING",
								value: "age",
							},
							value: {
								type: "NumberLiteral",
								value: 27,
							},
						},
					],
				},
			],
		});
	});
});
