import fs from 'fs';
import ohm from 'ohm-js';

const grammar = ohm.grammar(fs.readFileSync('grammar.ohm', 'utf-8'));
const semantics = grammar.createSemantics();

semantics.addOperation('parse', {
	on: (a, b, c, d, e, f) => console.log([a, b, c, d, e, f]),
});

const userInput = `on message(m):`;

const match = grammar.match(userInput);
if (!match.succeeded()) {
	console.log("Parsing failed:", match.message)
} else {
	let res = semantics(match).parse();
	console.log(res);
}