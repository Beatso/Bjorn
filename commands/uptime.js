const prettyMilliseconds = require("pretty-ms")
const client = require("../index.js")

module.exports = {
    name: 'uptime',
    description: "Checks how long the bot has been online for.",
    availableTo: "@everyone",
	execute(message, args) {
        message.channel.send(`Uptime: ${prettyMilliseconds(client.uptime)}`)
    },
}
