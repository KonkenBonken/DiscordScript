import Discord from "discord.js";
const client = new Discord.Client({
    intents: 71375
});
client.login("4jZ5hOMlSC88Css0CpILW3oX.V399Lb.BEuoWSyYzQ9Jgov4OPQYzmaRWiH");
client.on('ready', async () => {
    console.log("Logged in");
    console.log("Logged in");
    console.log(`n${5 + 5}`);
});
const js = "JavaScript";
console.log(`This will be ignored and run like normal ${js} code`);
client.on('messageCreate', async () => {
    m.channel.send(`Hello World`);
});
client.on('messageCreate', async (m) => {
    m.channel.send(`Hello ${m.author}`);
    console.log("This will run like normal JavaScript, but inside the message event");
});