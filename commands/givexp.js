const { giveXP } = require("../levelling.js")
const { prefix } = require("../config.json")
const { parseMember } = require("../utils.js")

module.exports = {
	name: 'givexp',
	description: "Gives XP to a member.",
	aliases: ["addxp"],
	usage: "[user] [amount]",
	parameters: "**User**: The ID or @mention of the user you would like to give XP to.\n**Amount**: The amount of XP you would like to give to the user.",
	availableTo: "<@&739379990415540267>", // moderator role id
	execute(message, args) {
		if (!message.member.roles.cache.some(role => role.id == "739379990415540267")) message.delete().then(message.channel.send("This command is only available to moderators.").then(message=>message.delete({timeout:10000}))).catch((error)=>console.error(error)) // moderator role id
		else {

			if (!args[0] || !args[1]) return message.channel.send(`Incorrect args.\nUsage: ${prefix}${this.name} ${this.usage}`)

			const parsedMember = parseMember(args[0], message.guild)

			if (!parsedMember.success)
				return message.channel.send(`Could not find a valid specified user.\nUsage: ${prefix}${this.name} ${this.usage}`)
			
			member = parsedMember.member

			const result = giveXP(member, Number(args[1]), false)

			if (result.success) {
				message.channel.send(`Successfully gave **${args[1]}** XP to **${member.user.tag}**`)
			} else {
				result.reason
					? message.channel.send(`Failed for the following reason:\n\`${result.reason}\``)
					: message.channel.send("Failed :c")
			}

		}
	}
}
