const { prefix, footers } = require('../config.json');

module.exports = {
    name: 'bubblewrap',
    description: 'pop',
    usage: `${prefix}bubblewrap`,
    type: "peasant",
    cooldown: 10,
	execute(message, args) {
        const bubbleWrapEmbed = {
            "title": "Pop!",
            "description": "||pop||||pop||||pop||||pop||||pop||\n\
            ||pop||||pop||||pop||||pop||||pop||\n\
            ||pop||||pop||||pop||||pop||||pop||\n\
            ||pop||||pop||||pop||||pop||||pop||\n\
            ||pop||||pop||||pop||||pop||||pop||\n\
            ||pop||||pop||||pop||||pop||||pop||\n\
            ||pop||||pop||||pop||||pop||||pop||",
            "color": 16087843,
            "footer": { "text": footers[Math.floor(Math.random()*footers.length)] }
        };
        message.channel.send({embed: bubbleWrapEmbed})
    },
};2