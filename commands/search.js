const { prefix } = require('../config.json');
const { footers } = require('../config.json');

module.exports = {
    name: 'search',
    description: 'Searches the web. Prefix your query with `%23g` to search google instead of ecosia. Try to only use letters and spaces.',
    usage: `${prefix}search query`,
    type: "peasant",
    cooldown: 5,
	execute(message, args) {
        query=args.join("+")
        readable_query=args.join(" ")
        searchembed = {
            "title": "Search Web",
            "description": "[Search Ecosia for \`"+readable_query+"\`]("+"https://www.ecosia.org/search?q="+query+")",
            "color": 16087843,
            "footer": { "text": footers[Math.floor(Math.random()*footers.length)]}
        }
        return message.channel.send({embed: searchembed})
            .catch(error => {
                console.error(`Could not give search link to ${message.author.tag}.\n`, error);
                message.reply('Well that didn\'t work. <@634776327299399721>, got any ideas?');
            });
    },
};