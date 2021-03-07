const { parseMember } = require("../utils.js")
const { queryXP } = require("../levelling.js")

module.exports = {
	name: 'rank',
	description: "Shows a user's experience.",
	aliases: ["xp", "level", "experience"],
	usage: "[user]",
	parameters: "**User**: [optional] the user to get info on. If not given, defaults to the person who executed the command.",
	availableTo: "@everyone", // moderator role id
	execute(message, args) {

		const parsedMember = parseMember(args[0], message.guild)
		if (parsedMember.success) member = parsedMember.member
		else member = message.member

		const xp = queryXP(member.id)
		console.log(xp.points, xp.level)

	}
}
