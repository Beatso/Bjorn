const { prefix, color } = require('../config.json')
const request = require('request')

module.exports = {
	name: 'mcserver',
	aliases: ['server', 'minecraftserver', 'serverstatus', 'mcserverstatus', 'minecraftserverstatus', 'mcsrv'],
	description: 'Pings and gets info about a Minecraft server.',
	usage: '[address]',
	availableTo: '@everyone',
    execute(message, args) {
		if (!args[0]) return message.channel.send(`You need to provide a server address!\nUsage\`${prefix}${this.name} ${this.usage}\``)
		
		request(`https://api.mcsrvstat.us/2/${args[0]}`, (err, res, body) => {

			if (err) return message.channel.send({ embed: {
				title: 'Error',
				description: 'There was an error trying to get the server status. Maybe try again later?',
				color: color
			}})

			const data = JSON.parse(body)

			if (!data.online) return message.channel.send({ embed: {
				author: {
					name: 'mcsrvstat.us',
					icon_url: 'https://mcsrvstat.us/img/minecraft.png',
					url: `https://mcsrvstat.us/server/${args[0]}`
				},
				title: 'Server Unavailable',
				description: 'The server is either offline or not available. Make sure you typed the correct address and try again later.',
				footer: { text: 'The response is currently cached for 5 minutes. Powered by mcsrvstat.us' },
				color: color
			}})
			
			embed = {
				author: {
					name: 'mcsrvstat.us',
					icon_url: 'https://mcsrvstat.us/img/minecraft.png',
					url: `https://mcsrvstat.us/server/${args[0]}`
				},
				title: 'Server Online',
				description: data.motd.clean.join("\n"),
				fields: [
					{
						name: 'Address',
						value: args[0].toLowerCase(),
						inline: true
					},
					{
						name: 'Players',
						value: `${data.players.online}/${data.players.max}`,
						inline: true
					},
					{
						name: 'Version',
						value: data.version,
						inline: true
					},
					{
						name: 'IP',
						value: `${data.ip}:${data.port}`,
						inline: true
					}
				],
				footer: { text: 'The response is currently cached for 5 minutes. Powered by mcsrvstat.us' },
				thumbnail: { url: `https://api.mcsrvstat.us/icon/${args[0]}` },
				color: color
			}

			if (data.software) embed.fields.push({
				name: 'Software',
				value: data.software,
				inline: true
			})

			if (data.plugins) embed.fields.push({
				name: 'Plugins',
				value: data.plugins.join(", "),
				inline: true
			})

			if (data.mods) embed.fields.push({
				name: 'Mods',
				value: data.mods.join(", "),
				inline: true
			})

			if (data.players.list && data.players.list.length <= 12) embed.fields.push({
				name: 'Online Players',
				value: data.players.list.join(", "),
				inline: true
			})

			message.channel.send({embed: embed})

		})

	},
}
