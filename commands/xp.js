const { queryXP } = require("../levelling.js")
const { prefix } = require("../config.json")

module.exports = {
	name: 'xp',
	description: "Checks how much XP a user has.",
	aliases: ["queryxp"],
	usage: "[user]",
	parameters: "**User**: (optional) The ID or @mention of the user you would like to give XP to.",
	availableTo: "@everyone", // moderator role id
	execute(message, args) {
		
		// currently logs data; need to feed back to the user
		console.log(queryXP(args[0] ? message.guild.members.cache.get(/(\d{18})|<@?(\d{18})>/.exec(args[0])[0]).id : message.member.id))

	}
}
