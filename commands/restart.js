const { prefix } = require('../config.json');

module.exports = {
    name: 'restart',
    description: 'restarts the bot yeah no shit',
    usage: `${prefix}restart`,
    type: "admin",
    cooldown: 0,
	execute(message, args) {
        if (message.author.id === '634776327299399721') {
            message.react("🔄");
            console.log("hi");
            setTimeout(function() {process.exit()},500);
        }
    },
};