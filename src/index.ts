import { lexer } from "./lexer";
import { parser } from "./parser";

const tokens = lexer('{"name":"camiha", "age":27, "arr": [1,2,3] }');
const json = parser(tokens);
console.dir(json, { depth: null });
