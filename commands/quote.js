const sendError = require('@functions/sendError');
const config = require('@config');
const quoteapi = require('incorrectquotesapi');

module.exports = {
	name: 'quote',
	description: 'Sends a quote from the incorrect quotes api',
	usage: `quote [number of people] [peoples names separated by ,]`,
	async execute(client, message, args, Discord) {
		const embed = new Discord.MessageEmbed().setColor(config.colors.defualt);
		const clean = message.content.includes('--clean') ? true : false;
		if (clean) args.splice(args.indexOf('--clean'), 1);

		if (!args[0]) {
			embed.addField(quoteapi(1), String.fromCharCode(8203));
		} else {
			if (Number(args[0]) > 6)
				return sendError(message, 'That is too many people. The limit is 6.', 'Too Many People');

			const amount = args[0];
			args.shift();
			args = args.join(' ');
			let people = [];
			if (args[0]) people = args.split(',');
			const desc = quoteapi(amount, { names: people, clean: clean });
			descArr = desc.split('\n');
			descArr.forEach((line) => {
				embed.addField(line, String.fromCharCode(8203));
			});
			// embed.setDescription(desc);
		}
		return message.channel.send(embed);
	}
};
