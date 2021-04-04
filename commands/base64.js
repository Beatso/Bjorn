const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'base64',
	description: 'Encodes and Decodes base64',
	usage: `<encode | decode> <text>`,
	execute(message, args) {

		args[0] = args[0].toLowerCase()

		if (!args[0]) return message.reply('You must specify encoding or decoding.');
		if (!(args[0] == 'encode' || args[0] == 'decode')) return message.reply('You must specify encoding or decoding.');
		if (!args[1]) return message.reply(`You must specify text to ${args[0]}.`);

		const embed = new MessageEmbed().setTitle(`Base 64 ${args[0]}`).setColor(message.guild ? message.guild.me.displayHexColor : '')

		const text = args.join(' ').substring(args[0].length + 1);

		try {

			if (args[0] == 'encode')
				embed.setDescription((new Buffer.from(text)).toString('base64'))
			else
				embed.setDescription((new Buffer.from(text, 'base64')).toString('ascii'))
		
		message.channel.send(embed)
			
		} catch (err) {
			message.reply(`There was an error ${args[0].substring(0, args[0].length - 1)}ing that.`);
			console.log(err);
		}
	}
};
