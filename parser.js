import fs from 'fs';
import ohm from 'ohm-js';

const grammar = ohm.grammar(fs.readFileSync('grammar.ohm', 'utf-8'));
const semantics = grammar.createSemantics();

semantics.addOperation('parse', {
	on(on, _2, Event, _3, varName, _4) {
		return [on, Event, varName]
	},
});

const userInput = `on message(m):`;

const match = grammar.match(userInput);
if (!match.succeeded()) {
	console.log("Parsing failed:", match.message)
} else {
	let res = semantics(match).parse();
	console.log(...res.map(x => x._node));
}