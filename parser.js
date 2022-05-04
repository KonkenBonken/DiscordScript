import fs from 'fs';
import grammarRules from './grammar.js'


const input = fs.readFileSync(process.argv[2], 'utf-8');

const lines = input.split('\n').map(line => line);
let output = `import Discord from "discord.js";\n`;

if (!input)
	throw new Error('input is empty');

let previousIndent = 0,
	bracketClosers = [];

for (let line of lines) {
	line = line.split("//")[0];
	if (!line.trim()) continue;

	// console.log(line);

	const indent = line.match(/^\s*/)[0].length;
	let indentChange = indent - previousIndent;
	previousIndent = indent;
	if (indentChange < 0)
		for (var i = 0; i < -indentChange; i++)
			output += bracketClosers.shift() || '';

	let successLine = false;
	for (let [regex, parser] of grammarRules) {
		if (regex.test(line)) {
			let parsed = parser(line.match(regex).groups || {});
			if (Array.isArray(parsed)) {
				bracketClosers.push(parsed[1] + ';');
				parsed = parsed[0];
			}
			output += parsed + '\n';
			successLine = true;
			break;
		};
	}
	if (!successLine)
		console.log('Error:', line)

}
output += bracketClosers.join(';');

console.log(output);