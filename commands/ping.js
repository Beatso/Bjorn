const { prefix } = require('../config.json');

module.exports = {
    name: 'ping',
    cooldown: 15,
	execute(message, args) {
        message.react("👋")
    },
};