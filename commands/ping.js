const { prefix } = require('../config.json');

module.exports = {
    name: 'ping',
    description: 'check if the bot is online',
    usage: `${prefix}ping`,
    type: "peasant",
    cooldown: 15,
	execute(message, args) {
        message.react("👋")
    },
};