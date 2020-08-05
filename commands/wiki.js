const { prefix } = require('../config.json');
const { footers } = require('../config.json');

module.exports = {
    name: 'wiki',
    description: 'Searches the Minecraft Wiki, or goes directly to that page if it exists. Try to only use letters and spaces.',
    usage: `${prefix}wiki query`,
    type: "peasant",
    cooldown: 5,
	execute(message, args) {
        query=args.join("+")
        readable_query=args.join(" ")
        wikiembed = {
            "title": "Search Minecraft Wiki",
            "description": "[Search the Official Minecraft Wiki for \`"+readable_query+"\`]("+"https://minecraft.gamepedia.com/index.php?search="+query+")",
            "color": 16087843,
            "footer": { "text": footers[Math.floor(Math.random()*footers.length)]}
        }
        return message.channel.send({embed: wikiembed})
            .catch(error => {
                console.error(`Could not give wiki link to ${message.author.tag}.\n`, error);
                message.reply('Well that didn\'t work. <@634776327299399721>, got any ideas?');
            });
    },
};