module.exports = {
    name: 'ping',
    description: "Checks the bot is online and gets its response time.",
    availableTo: "@everyone",
	execute(message, args) {
        message.channel.send(`The bot responded in ${ Date.now() - message.createdTimestamp }ms.`)
    },
};