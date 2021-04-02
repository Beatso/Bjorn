const fetch = require('node-fetch');
const { color } = require('../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'cem',
	description: 'Gets cem things for cem',
	aliases: [ 'entity' ],
	usage: `<entity>`,
	async execute(message, args) {
		if (!args[0])
			return message.channel.send(`You must specify an entity.\nUsage: ?${module.exports.name} ${module.exports.usage}`);
		
		const cemInfo = await fetch(
			'https://raw.githubusercontent.com/ewanhowell5195/discord_bot_assets/master/cem_models.json'
		)
			.then(res => res.json())
			.then(json => json)
		
		const cem = {
			supported: cemInfo.entities.supported,
			unsupported: cemInfo.entities.unsupported,
			unreleased: cemInfo.entities.unreleased
		}

		if (cem.supported[args.join('_')]) {
			let embed = new MessageEmbed()
				.setColor(color)
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
				new MessageEmbed()
					.setDescription(`\`${args.join('_')}\` is currently not supported.`, { disableMentions: 'all' })
					.setTitle('Model Not Supported')
					.setColor(color)
			)
		
		if (cem.unreleased && cemInfo.entities.unreleased.includes(args.join('_')))
			return message.channel.send(`\`${args.join('_')}\` is currently not released.`, { disableMentions: 'all' });

		return message.channel.send(`${args.join('_')} is not a valid entity.`, { disableMentions: 'all' });
	}
}
