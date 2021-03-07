const { parseMember } = require("../utils.js")
const { queryXP, sortRanks, giveXP } = require("../levelling.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'rank',
	description: "Shows a user's experience.",
	aliases: ["xp", "level", "experience"],
	usage: "[user]",
	parameters: "**User**: [optional] the user to get info on. If not given, defaults to the person who executed the command.",
	availableTo: "@everyone",
	execute(message, args) {

		const parsedMember = parseMember(args[0], message.guild)
		if (parsedMember.success) member = parsedMember.member
		else member = message.member

		if (member.user.bot) return message.channel.send('Bots have no XP!')
		giveXP(member, 0, false)

		const xp = queryXP(member.id)

		message.channel.send({ embed: new MessageEmbed() 
			.setColor(message.guild.me.displayHexColor)
			.setTitle(`${member.nickname ? member.nickname : member.user.username}'s XP`)
			.setAuthor(member.user.tag, member.user.displayAvatarURL())
			.addFields(
				{
					name: 'Points',
					value: xp.points,
					inline: true
				},
				{
					name: 'Level',
					value: xp.level,
					inline: true
				},
				{
					name: 'Rank',
					value: sortRanks(messgae.guild).findIndex(element => element.id == member.id) + 1,
					inline: true
				},
				{
					name: 'Notifications',
					value: xp.notificationPreference,
					inline: true
				},
				{
					name: 'User',
					value: member.user.toString(),
					inline: true
				}
			)
			.setTimestamp()
			.setFooter(member.id)
		})

	}
}
