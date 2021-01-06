const { client } = require("../index.js")
const { color } = require("../config.json")

module.exports = {
    name: "time",
    description: "Gets the time in many timezones, or in a specified timezone",
    availableTo: "@everyone",
    aliases: ["timezones"],
	execute(message, args) {

		const addTime = timezone => `${timezone}: ${String((new Date).toLocaleString("en-GB", { timeZone: timezone }))}`

		if (args[0]) {
			try {
				message.channel.send(addTime(args[0]))
				sendAll = false
			} catch {
				sendAll = true
			}
		} else sendAll = true

		if (sendAll) {
			let messageToSend = ""
			for (timezone of ["America/Los_Angeles", "America/New_York", "Europe/London", "Europe/Paris", "Europe/Moscow", "Asia/Shanghai", "Asia/Tokyo"]) messageToSend += addTime(timezone) + "\n"
			message.channel.send(messageToSend)
		}

    },
}
