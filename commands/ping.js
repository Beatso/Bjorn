const prettyMilliseconds = require("pretty-ms")
const { client } = require("../index.js")
const { color } = require("../config.json")

module.exports = {
    name: 'ping',
    description: "Checks the bot is online and gets its latency and uptime.",
    availableTo: "@everyone",
    aliases: ["pong", "uptime", "botinfo"],
	execute(message, args) {
        message.channel.send({embed: {
            color: color,
            title: "Pong!",
            fields: [
                {
                    name: "Latency",
                    value: `${ Date.now() - message.createdTimestamp }ms`
                },
                {
                    name: "Uptime",
                    value: prettyMilliseconds(client.uptime)
                }
            ],
            timestamp: new Date()
        }})
    },
}
