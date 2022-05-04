// string = /(['"])(?<string>(?:(?!\1|\\).|\\.)*)\1/
// backtick = /`(?<string>(?:(?!`|\\).|\\.)*)`/

export default [
	[/intents\s+(?<intents>\d+)/, ({ intents }) => `const client=new Discord.Client({intents:${intents}});`],
	[/login\s+(?<token>[a-zA-Z\d\.]{55,65})/, ({ token }) => `client.login(${token});`],
	[/on\s+login:/, () => [`client.on('ready',async()=>{`, '})']],
	[/on\s+message(\((?<args>(\w+,)*\w+)\))?:/, ({ args }) => [`client.on('messageCreate',async(${args||''})=>{`, '})']],
	[/print\s+(['"])(?<string>(?:(?!\1|\\).|\\.)*)\1/, ({ string }) => `console.log("${string}");`],
	[/print\s+`(?<string>(?:(?!`|\\).|\\.)*)`/, ({ string }) => `console.log(\`${string}\`);`],
	[/send\s+(['"])(?<string>(?:(?!\1|\\).|\\.)*)\1\s+in\s+(?<channel>.+)/, ({ string, channel }) => `${channel}.send("${string}")`],
	[/send\s+`(?<string>(?:(?!`|\\).|\\.)*)`\s+in\s+(?<channel>.+)/, ({ string, channel }) => `${channel}.send(\`${string}\`)`],
]