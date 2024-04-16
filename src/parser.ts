import { type Token, TOKEN_TYPE } from "./const";

interface BaseNode {
	type: string;
}

interface LiteralNode extends BaseNode {
	value: string | number | boolean | null;
}

interface ObjectExpression extends BaseNode {
	properties: PropertyNode[];
}

interface PropertyNode extends BaseNode {
	key: LiteralNode;
	value: BaseNode;
}

interface ArrayExpression extends BaseNode {
	elements: BaseNode[];
}

class ParseError extends Error {
	constructor(message: string, token: Token) {
		super(
			`Parse error at token ${token.type} with value ${token.value}: ${message}`,
		);
		this.name = "ParseError";
	}
}

export const getLiteralNodeType = (
	value: string | number | boolean | null,
): string => {
	switch (typeof value) {
		case "string":
			return "StringLiteral";
		case "number":
			return "NumberLiteral";
		case "boolean":
			return value ? "TrueLiteral" : "FalseLiteral";
		default:
			return "NullLiteral";
	}
};

export const parseLiteral = (token: Token): LiteralNode => {
	return {
		type: getLiteralNodeType(token.value),
		value: token.value,
	};
};

export const parsePropertyKey = (token: Token): LiteralNode => {
	if (token.type !== TOKEN_TYPE.STRING) {
		throw new ParseError("Expected string token for property key", token);
	}

	return {
		type: "STRING",
		value: token.value,
	};
};

export const parseExpression = (
	tokens: Token[],
	index: number,
): {
	node: BaseNode;
	nextIndex: number;
} => {
	const token = tokens[index];
	switch (token.type) {
		case TOKEN_TYPE.STRING:
		case TOKEN_TYPE.NUMBER:
		case TOKEN_TYPE.TRUE:
		case TOKEN_TYPE.FALSE:
		case TOKEN_TYPE.NULL:
			return { node: parseLiteral(token), nextIndex: index + 1 };
		case TOKEN_TYPE.LEFT_BRACE:
			return parseObject({ tokens, index });
		case TOKEN_TYPE.LEFT_BRACKET:
			return parseArray({ tokens, index });
		default:
			throw new ParseError("Unrecognized token type", token);
	}
};

export const parseObject = ({
	tokens,
	index,
}: { tokens: Token[]; index: number }): {
	node: ObjectExpression;
	nextIndex: number;
} => {
	const properties: PropertyNode[] = [];
	let current = index + 1; // 左ブレースの次から開始

	while (tokens[current].type !== TOKEN_TYPE.RIGHT_BRACE) {
		const keyToken = tokens[current];
		const key: LiteralNode = parsePropertyKey(keyToken);
		current += 2; // コロンの次のトークンへ
		const { node: value, nextIndex } = parseExpression(tokens, current);
		properties.push({ type: "Property", key, value });
		current = nextIndex;

		if (tokens[current].type === TOKEN_TYPE.COMMA) {
			current++; // コンマの次へ
		}
	}

	return {
		node: { type: "ObjectExpression", properties },
		nextIndex: current + 1,
	};
};

export const parseArray = ({
	tokens,
	index,
}: { tokens: Token[]; index: number }): {
	node: ArrayExpression;
	nextIndex: number;
} => {
	const elements: BaseNode[] = [];
	let current = index + 1; // 左ブラケットの次から開始

	while (tokens[current].type !== TOKEN_TYPE.RIGHT_BRACKET) {
		const { node, nextIndex } = parseExpression(tokens, current);
		elements.push(node);
		current = nextIndex;

		if (tokens[current].type === TOKEN_TYPE.COMMA) {
			current++; // コンマの次へ
		}
	}

	return {
		node: { type: "ArrayExpression", elements },
		nextIndex: current + 1,
	};
};

export const parser = (tokens: Token[]) => {
	let current = 0;
	const body: BaseNode[] = [];

	while (current < tokens.length) {
		const { node, nextIndex } = parseExpression(tokens, current);
		body.push(node);
		current = nextIndex;
	}

	return {
		type: "Program",
		body,
	};
};
