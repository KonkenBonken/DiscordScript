export default [
	['intents (?<intents>@d+)',
		({ intents }) => `const client=new Discord.Client({intents:${intents}});`
	],
	['login (?<token>[a-zA-Z@d]{24}@.[a-zA-Z@d]{6}@.[a-zA-Z@d]{27})',
		({ token }) => `client.login(${token});`
	],
	['on login:',
		() => [`client.on('ready',async()=>{`, '})']
	],
	['on message(@((?<args>(@w+,)*@w+)@))?:',
		({ args }) => [`client.on('messageCreate',async(${args||''})=>{`, '})']
	],
	['print %s',
		({ string }) => `console.log("${string}");`
	],
	['print %b',
		({ string }) => `console.log(\`${string}\`);`
	],
	['send %s in (?<channel>.+)',
		({ string, channel }) => `${channel}.send("${string}");`
	],
	['send %b in (?<channel>.+)',
		({ string, channel }) => `${channel}.send(\`${string}\`);`
	],
]
.map(([regex, parse]) => {
	[
		[/\s/g, '\\s+'],
		[/%s/g, '([\'"])(?<string>(?:(?!\\1|\\\\).|\\\\.)*)\\1'],
		[/%b/g, '`(?<string>(?:(?!`|\\\\).|\\\\.)*)`'],
		[/@/g, '\\'],
	].forEach(([key, exp]) => regex = regex.replace(key, exp));

	return [new RegExp(regex), parse];
})