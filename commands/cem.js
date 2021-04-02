const fetch = require('node-fetch');
const sendError = require('@functions/sendError');
const config = require('@config');
const { default: didYouMean, ReturnTypeEnums, ThresholdTypeEnums } = require('didyoumean2');

module.exports = {
	name: 'cem',
	description: 'Gets cem things for cem',
	aliases: [ 'entity' ],
	usage: `cem <entity>`,
	async execute(client, message, args, Discord, cmd) {
		if (!args[0]) {
			return sendError(message, 'You must specify an entity.', 'Invalid Syntax');
		} else {
			var cemInfo = await fetch(
				'https://raw.githubusercontent.com/ewanhowell5195/discord_bot_assets/master/cem_models.json'
			)
				.then((res) => res.json())
				.then((json) => {
					return json;
				});
			var cem = {
				supported: cemInfo.entities.supported,
				unsupported: cemInfo.entities.unsupported,
				unreleased: cemInfo.entities.unreleased
			};

			if (cem.supported[args.join('_')]) {
				let embed = new Discord.MessageEmbed()
					.setColor(config.colors.defualt)
					.setTitle(cemInfo.entities.supported[args.join('_')].display_name);
				let bones = [];
				cemInfo.entities.supported[args.join('_')].bones.forEach((bone) => {
					bones.push(`\`${bone}\``);
				});
				embed.setDescription(bones.join(', '));
				return message.channel.send(embed);
			}
			if (cem.unsupported.includes(args.join('_')))
				return message.channel.send(
					new Discord.MessageEmbed()
						.setDescription(`\`${args.join('_')}\` is currently not supported.`)
						.setTitle('Model Not Supported')
						.setColor(config.colors.warn)
				);
			if (cem.unreleased) {
				if (cemInfo.entities.unreleased.includes(args.join('_')))
					return sendError(message, `\`${args.join('_')}\` is currently not released.`, 'CEM Not Released');
			}
			return sendError(message, `${args.join('_')} is not a valid entity.}`, `Invalid Entity`);
		}
	}
};
