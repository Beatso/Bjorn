module.exports = {
    name: 'ping',
    description: "Checks the bot is online and gets its response time.",
    availableTo: "@everyone",
    aliases: ["pong"],
	execute(message, args) {
        message.channel.send(`Pong! Latency: ${ Date.now() - message.createdTimestamp }ms.`)
    },
};