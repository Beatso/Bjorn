const { prefix, footers } = require('../config.json');

module.exports = {
    name: 'sarcastic',
    description: 'makes text sARcastiC',
    usage: `${prefix}sarcastic [text]`,
    type: "peasant",
    cooldown: 5,
	execute(message, args) {
        function makeSarcastic(textToChange) {
            textToChange = textToChange.toLowerCase();
            arrayToChange = textToChange.split("");
            for (i in arrayToChange) {
                if (Math.random()>0.5) {
                    arrayToChange[i]=arrayToChange[i].toUpperCase()
                }
            }
            return arrayToChange.join("");
        }
        const sarcasticEmbed = {
            "title": makeSarcastic("sarcastic"),
            "description": makeSarcastic(args.join(" ")),
            "color": 16087843,
            "footer": { "text": makeSarcastic(footers[Math.floor(Math.random()*footers.length)]) }
        };
        message.channel.send({embed: sarcasticEmbed})
    },
};