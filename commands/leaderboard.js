const { queryXP, sortRanks, giveXP } = require("../levelling.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'leaderboard',
	description: "Get's the users with the top XP.",
	availableTo: "@everyone",
	aliases: ['lb'],
	usage: '[number of people to find]',
	execute(message, args) {

		giveXP(message.member, 0, false)

		const sortedRanks = sortRanks(message.guild)

		const numberToFind = (!isNaN(args[0]) && Number(args[0])>=1 && Number(args[0])<=30) ? Number[args[0]] : 10

		const topX = sortedRanks.splice(0, numberToFind)
		const authorInTopX = topX.some(element => element.id == message.author.id)

		let description = ''

		topX.forEach((element, index) => {
			const member = message.guild.members.cache.get(element.id)
			description += `**${index+1}**: ${member.nickname ? `${member.nickname} (${member.user.username})` : member.user.username} - ${element.points} points\n`
		})

		if (!authorInTopX) {
			const authorXP = queryXP(message.author.id)
			description += `\n**${sortRanks(message.guild).findIndex(element => element.id == message.author.id) + 1}**: ${message.member.nickname ? `${message.member.nickname} (${message.member.user.username})` : message.member.user.username} - ${authorXP.points} points`
		}

		message.channel.send({ embed:
			new MessageEmbed() 
				.setColor(message.guild.me.displayHexColor)
				.setTitle('Leaderboard')
				.setTimestamp()
				.setDescription(description)
		})

	}
}
