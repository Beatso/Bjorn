module.exports = {
    name: 'ping',
    description: "Checks the bot is online.",
    availableTo: "@everyone",
	execute(message, args) {
        message.react("👋")
    },
};