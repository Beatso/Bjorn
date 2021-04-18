const prettyMilliseconds = require("pretty-ms")
const { client } = require("../index.js")
const { color, prefix } = require("../config.json")

module.exports = {
    name: 'ping',
    description: "Checks the bot is online and gets its latency and uptime.",
    availableTo: "@everyone",
    aliases: ["pong", "uptime", "botinfo"],
	execute(message, args) {
        message.channel.send({embed: {
            color: color,
            title: `${message.content.slice(prefix.length).split(/ +/)[0].toLowerCase() == 'pong' ? 'Ping!' : 'Pong!'}`,
            fields: [
                {
                    name: "Latency",
                    value: `${ Date.now() - message.createdTimestamp }ms`
                },
                {
                    name: "Uptime",
                    value: prettyMilliseconds(client.uptime, {secondsDecimalDigits: 0})
                }
            ],
            footer: {
                text: String((new Date).toUTCString())
            }
        }})
    },
}
