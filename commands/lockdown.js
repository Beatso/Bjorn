const {client} = require("../index.js")

module.exports = {
	name: 'lockdown',
	description: "Makes the server read only.",
	availableTo: "<@&739379990415540267>", // moderator role id
	aliases: ["lock", "serverlock"],
	usage: "[optional reason]",
	execute(message, args) {
		if (!message.member.roles.cache.some(role => role.id == "739379990415540267")) message.delete().then(message.channel.send("This command is only available to moderators.").then(message=>message.delete({timeout:10000}))).catch((error)=>console.error(error)) // moderator role id
		else {
			const memberRole = message.channel.guild.roles.cache.find(role=>role.id=="764786089445556244") // member role id
			const reason = `server lockdown triggered by ${message.member.tag}`
			for (entry of message.guild.channels.cache.entries()) {
				const channel = entry[1]
				if (channel.type=="text" || channel.type=="news") {
					channel.updateOverwrite(memberRole, { SEND_MESSAGES: false, ADD_REACTIONS: false }, reason)
				} else if (channel.type=="voice") {
					channel.updateOverwrite(memberRole, { SPEAK: false, STREAM: false }, reason)
				}
			}

			// announce lockdown
			client.channels.cache.get("791436781533790218").send({embed:{ // server announcements
				"title": "Server Lockdown",
				"description": `This server is temporarily read only. This lockdown was triggered by <@${message.member.id}>.`,
				"fields": (args[0] == undefined) ? null : [{
					"name": "Reason",
					"value": args.join(" ")
				}],
				"color": "FF0000"
			}})
		}
	}
};
