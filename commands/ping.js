module.exports = {
    name: 'ping',
    cooldown: 15,
	execute(message, args) {
        message.react("👋")
    },
};