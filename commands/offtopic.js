const {channelIDs} = require("../config.json")
const { color } = require('../config.json')

module.exports = {
    name: "offtopic",
    aliases: ["topic"],
    description: "Sends a message about a conversation being off topic.",
    availableTo: "@everyone",
	execute(message, args) {
        message.channel.send({ embed: {
			author: {
				name: message.member.nickname || message.author.username,
				icon_url: message.author.displayAvatarURL()
			},
			description: `This is off topic for this channel. See the channel description for more info on how to use this channel. Off topic discussion can be continued in <#${channelIDs.offTopic}>.`,
			color: color
		}})
    }
}
