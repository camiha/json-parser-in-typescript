export const TOKEN_TYPE = {
	LEFT_BRACE: "LEFT_BRACE",
	RIGHT_BRACE: "RIGHT_BRACE",
	LEFT_BRACKET: "LEFT_BRACKET",
	RIGHT_BRACKET: "RIGHT_BRACKET",
	COLON: "COLON",
	COMMA: "COMMA",
	STRING: "STRING",
	NUMBER: "NUMBER",
	TRUE: "TRUE",
	FALSE: "FALSE",
	NULL: "NULL",
} as const;

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];

// biome-ignore lint/suspicious/noExplicitAny:
export interface Token<T = any> {
	type: TokenType;
	value: T;
}
