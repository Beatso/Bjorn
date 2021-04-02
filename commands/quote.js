const config = require('../config.json');
const quoteapi = require('incorrectquotesapi');
const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'quote',
	description: 'Sends a quote from the incorrect quotes API',
	usage: `[number of people] [peoples names separated by commas]`,
	async execute(message, args) {
		const embed = new MessageEmbed().setColor(config.color);
		const clean = message.content.includes('--clean') ? true : false;
		if (clean) args.splice(args.indexOf('--clean'), 1);


		if (!args[0]) {
			embed.setDescription(quoteapi(1), String.fromCharCode(8203))
		} else {

			let amount
			let people

			if (isNaN(args[0])) { 
				people = args.join(' ').split(',').map(e => e.trim())
				amount = people.length
				console.log({people,amount})
			} else {
				amount = Number(args[0])
				args.shift();
				people = args.join(' ').split(',').map(e => e.trim())
			}
				

			if (!Number.isInteger(amount) || amount < 1 || amount > 6)
				return message.channel.send('Invalid number of people provided. Must be a whole number between 1 and 6.')

			embed.setDescription(quoteapi(amount, { names: people, clean: clean }))
		}
		return message.channel.send(embed);
	}
};
