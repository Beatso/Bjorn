const {client} = require("../index.js")


module.exports = {
	name: 'unlock',
	description: "Undoes a server lockdown.",
	usage: "[number of messges to delete]",
	availableTo: "<@&739379990415540267>", // moderator role id
	aliases: ["serverunlock"],
	execute(message, args) {
		if (!message.member.roles.cache.some(role => role.id == "739379990415540267")) message.delete().then(message.channel.send("This command is only available to moderators.").then(message=>message.delete({timeout:10000}))).catch((error)=>console.error(error)) // moderator role id
		else {
			const memberRole = message.channel.guild.roles.cache.find(role=>role.id=="764786089445556244") // member role id
			const reason = `server unlock triggered by ${message.member.tag}`
			for (entry of message.guild.channels.cache.entries()) {
				const channel = entry[1]
				if (channel.type=="text" || channel.type=="news") {
					channel.updateOverwrite(memberRole, { SEND_MESSAGES: null, ADD_REACTIONS: null }, reason)
				} else if (channel.type=="voice") {
					channel.updateOverwrite(memberRole, { SPEAK: null, STREAM: null }, reason)
				}
			}

			// announce unlock
			client.channels.cache.get("791436781533790218").send({embed:{ // server announcements channel id
				"title": "Server Unlocked",
				"description": `<@${message.member.id}> has unlocked the server.`,
				"color": "FF0000"
			}})
		}
	}
};
