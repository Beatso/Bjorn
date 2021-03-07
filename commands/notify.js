const {client} = require("../index.js")
const {prefix} = require("../config.json")
const { giveXP } = require("../levelling.js")

module.exports = {
	name: "notify",
	description: "Changes your notification preference for when you level up.",
	aliases: ["notification", "notificationpreference"],
	availableTo: "@everyone",
	cooldown: 5,
	execute(message, args) {

		giveXP(message.author.id, 0, false)

		const currentPreference = ( client.points.get(message.author.id, "notificationPreference") || "server" ) // default to server if no preference
		var changedPreference = false

		if (
			args[0] &&
			(
				args[0].toLowerCase() == "server" ||
				args[0].toLowerCase() == "dm" ||
				args[0].toLowerCase() == "none"
			)
		) {
			if (args[0].toLowerCase() == currentPreference) {
				message.channel.send(`That's already your current preference!\nUse \`${prefix}${this.name} [server | dm | none]\` to change your preference.`)
				return
			}
			client.points.set(message.author.id, args[0].toLowerCase(), "notificationPreference")
			changedPreference = true
		}
		
		let messageToSend = changedPreference ? "Your preference is now set to " : "Your current preference is set to "
		
		switch (client.points.get(message.author.id, "notificationPreference")) {
			case "server":
				messageToSend += "**Server**. You will be notified in <#749377732009525312>"
				break
			case "dm":
				messageToSend += "**DM**. You will be notified in your Direct Messages"
				break
			case "none":
			default:
				messageToSend += "**None**. You will not be notified"
				break
		}
		messageToSend += ` when you level up.\nUse \`${prefix}${this.name} [server | dm | none]\` to change your preference.`
		message.channel.send(messageToSend)
		
	}
}
