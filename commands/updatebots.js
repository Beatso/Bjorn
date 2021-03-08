const { exec } = require('child_process')

module.exports = {
	name: 'updatebots',
	description: 'Runs direct JS code.',
	availableTo: "<@634776327299399721>",
	aliases: [],
	async execute(message, args) {

		if (message.author.id !== '634776327299399721') return message.channel.send('You don\'t have permission to do that!')

		exec('pull_all.sh', { cwd: '~/Documents/discord-bots/pull_all.sh' })
		
	},
}
