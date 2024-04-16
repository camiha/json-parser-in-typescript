import { TOKEN_TYPE, type Token, type TokenType } from "./const";

export class LexicalError extends Error {
	constructor(character: string, position: number) {
		super(`Unrecognized character '${character}' at position ${position}`);
		this.name = "LexicalError";
	}
}

export const handleNumber = ({
	input,
	startIndex,
}: { input: string; startIndex: number }): {
	token: Token;
	nextIndex: number;
} => {
	let current = startIndex;
	let value = "";

	if (input[current] === "-") {
		value += "-";
		current++;
	}

	while (current < input.length && /[[0-9]/.test(input[current])) {
		value += input[current];
		current++;
	}

	return {
		token: createToken(TOKEN_TYPE.NUMBER, Number.parseInt(value, 10)),
		nextIndex: current,
	};
};

export const handleString = ({
	input,
	startIndex,
}: { input: string; startIndex: number }): {
	token: Token;
	nextIndex: number;
} => {
	let current = startIndex + 1; // 開始ダブルクォートをスキップ
	let value = "";

	while (current < input.length && input[current] !== '"') {
		if (input[current] === "\\") {
			current++;
			if (current < input.length) {
				value += input[current];
			}
		} else {
			value += input[current];
		}
		current++;
	}

	current++;

	return {
		token: createToken(TOKEN_TYPE.STRING, value),
		nextIndex: current,
	};
};

export const handleKeyword = ({
	startIndex,
	keyword,
	type,
}: {
	startIndex: number;
	keyword: string;
	type: TokenType;
}): {
	token: Token;
	nextIndex: number;
} => {
	const current = startIndex + keyword.length;

	return {
		token: createToken(type),
		nextIndex: current,
	};
};

export const createToken = (
	type: TokenType,
	value?: string | number | boolean | null,
): Token => {
	return {
		type: TOKEN_TYPE[type],
		value,
	};
};

export const lexer = (input: string): Token[] => {
	let current = 0;
	const tokens: Token[] = [];

	while (current < input.length) {
		const char = input[current];

		if (char === "{") {
			tokens.push(createToken(TOKEN_TYPE.LEFT_BRACE));
			current++;
			continue;
		}

		if (char === "}") {
			tokens.push(createToken(TOKEN_TYPE.RIGHT_BRACE));
			current++;
			continue;
		}

		if (char === "[") {
			tokens.push(createToken(TOKEN_TYPE.LEFT_BRACKET));
			current++;
			continue;
		}

		if (char === "]") {
			tokens.push(createToken(TOKEN_TYPE.RIGHT_BRACKET));
			current++;
			continue;
		}

		if (char === ":") {
			tokens.push(createToken(TOKEN_TYPE.COLON));
			current++;
			continue;
		}

		if (char === ",") {
			tokens.push(createToken(TOKEN_TYPE.COMMA));
			current++;
			continue;
		}

		if (/\s/.test(char)) {
			current++;
			continue;
		}

		if (
			/[0-9]/.test(char) ||
			(char === "-" && /[0-9]/.test(input[current + 1]))
		) {
			const { token, nextIndex } = handleNumber({
				input,
				startIndex: current,
			});
			tokens.push(token);
			current = nextIndex;
			continue;
		}

		if (char === '"') {
			const { token, nextIndex } = handleString({
				input,
				startIndex: current,
			});
			tokens.push(token);
			current = nextIndex;
			continue;
		}

		if (char === "t" && input.slice(current, 4) === "true") {
			const { token, nextIndex } = handleKeyword({
				startIndex: current,
				keyword: "true",
				type: TOKEN_TYPE.TRUE,
			});
			tokens.push(token);
			current = nextIndex;
			continue;
		}

		if (char === "f" && input.slice(current, 5) === "false") {
			const { token, nextIndex } = handleKeyword({
				startIndex: current,
				keyword: "false",
				type: TOKEN_TYPE.FALSE,
			});
			tokens.push(token);
			current = nextIndex;
			continue;
		}

		if (char === "n" && input.slice(current, 4) === "null") {
			const { token, nextIndex } = handleKeyword({
				startIndex: current,
				keyword: "null",
				type: TOKEN_TYPE.NULL,
			});
			tokens.push(token);
			current = nextIndex;
			continue;
		}

		throw new LexicalError(char, current);
	}

	return tokens;
};
