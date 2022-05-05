import fs from 'fs';
import beautify from 'js-beautify';
import uglify from "uglify-js";
import grammarRules from './lib/grammar.js'


const args = {
	files: process.argv.slice(2).filter(a => !a.startsWith('-')),
	options: process.argv.slice(2).filter(a => a.startsWith('-')).map(a => a.substr(1)).join('')
}

const input = fs.readFileSync(args.files[0], 'utf-8');

const lines = input.split('\n').map(line => line);
let output = `import Discord from "discord.js";\n`;

if (!input)
	throw new Error('input is empty');

let previousIndent = 0,
	bracketClosers = [],
	resetBrackets = () => output += bracketClosers.join(';'),
	ignore = false;

for (let line of lines) {
	line = line.split("//")[0];
	if (!line.trim()) continue;

	const indent = line.match(/^\s*/)[0].length;
	let indentChange = indent - previousIndent;
	previousIndent = indent;
	if (indentChange < 0)
		for (var i = 0; i < -indentChange; i++)
			output += bracketClosers.shift() || '';

	if (line.trim() == '#{') {
		ignore = true;
		continue;
	} else
	if (line.trim() == '}#') {
		ignore = false;
		continue;
	} else
	if (ignore) {
		output += line;
		continue;
	}

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
resetBrackets();

if (args.options.includes('m')) //beautify
	output = uglify.minify(output).code;
else //beautify
	output = beautify.js(output);


if (args.files[1])
	fs.writeFileSync(args.files[1], output);
else
	console.log(output);