const { prefix, color } = require('./config.json');

module.exports = {
    name: 'search',
    cooldown: 5,
	execute(message, args) {
        var embed
        if (args.length==0) { embed = {
            "title": "Search Web",
            "description": `[Search Ecosia for \`${args.join(" ")}\`](https://www.ecosia.org/search?q=${args.join("+")})`,
            "color": color,
            "footer": { "text": footers[Math.floor(Math.random()*footers.length)]}
        }} else {
            embed = {
                "title": "Search Web",
                "description": `You need to say what you want to search for! Usage: \`${prefix}search [query]\``,
                "color": color,
                "footer": { "text": `Triggered by <@${message.author.id}>`}
            }
        }
        return message.channel.send({embed: embed})
        .catch(error => {
            console.error(`Could not give search link to ${message.author.tag}.\n`, error);
            message.reply('There was an error searching for that?');
        });
    },
};