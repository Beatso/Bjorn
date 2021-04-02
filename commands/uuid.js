const config = require('../config.json');
const uuid = require('uuid');
const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'uuid',
	description: 'Generates an uuid',
	usage: `uuid [type]`,
	async execute(message, args) {
		if (args[0] != '1' && args[0] != '4')
			return message.channel.send(
				'You must specify a valid version for the uuid.\nValid Versions: `1`, `4`'
			)
		const version = args[0] || 4;
		const id = version == '1'
				? uuid.v1()
				: uuid.v4()

		return message.channel.send(
			new MessageEmbed()
				.setColor(config.color)
				.setTitle(`UUID v${version}`)
				.setDescription(`\`${id}\``)
		);
	}
};
