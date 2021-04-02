const sendError = require('@functions/sendError');
const config = require('@config');
const uuid = require('uuid');

module.exports = {
	name: 'uuid',
	description: 'Generates an uuid',
	usage: `uuid [type]`,
	async execute(client, message, args, Discord, cmd) {
		if (args[0] && (isNaN(args[0]) || (args[0] != '1' && args[0] != '4')))
			return sendError(
				message,
				'You must specify a valid version for the uuid.\nValid Versions: 1, 4',
				'Invalid Syntax'
			);
		const version = args[0] || 4;
		let id;
		if (version == '1') {
			id = uuid.v1();
		} else {
			id = uuid.v4();
		}

		return message.channel.send(
			new Discord.MessageEmbed()
				.setColor(config.colors.defualt)
				.setTitle(`UUID v${version}`)
				.setDescription(`\`${id}\``)
		);
	}
};
