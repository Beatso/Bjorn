const { color, prefix } = require('../config.json')

module.exports = {
	name: 'requests',
	description: "Displays info about pack requests.",
	availableTo: "@everyone",
	execute(message, args) {
		message.channel.send({ embed: {
			author: {
				name: message.member.nickname || message.author.username,
				icon_url: message.author.displayAvatarURL()
			},
			description: 'If you have a pack request, or would like someone to make a pack for you, you are welcome to put your request in <#738130778957021317>. There is no guarantee that anybody will take you up on your offer, though. You should not DM members asking for pack requests.',
			color: color
		}})
	}
}
