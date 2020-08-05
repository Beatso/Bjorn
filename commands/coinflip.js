const { footers } = require('../config.json');
const { prefix } = require('../config.json');


module.exports = {
    name: 'coinflip',
    type: "peasant",
    description: 'toss a coin',
    usage: `${prefix}coinflip`,
    cooldown: 5,
	execute(message, args) {
        function doRandHT() {
            var rand = ['Heads!','Tails!'];
            return rand[Math.floor(Math.random()*rand.length)];
        }
        const resultsEmbed = {
            "title": "Coinflip",
            "description": doRandHT(),
            "color": 16087843,
            "footer": { "text": footers[Math.floor(Math.random()*footers.length)]}
        };
        message.channel.send({ embed: resultsEmbed });
    },
};