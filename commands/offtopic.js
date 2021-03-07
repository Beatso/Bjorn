const {channelIDs} = require("../config.json")

module.exports = {
    name: "offtopic",
    aliases: ["ot"],
    description: "Sends a message about a conversation being off topic.",
    availableTo: "@everyone",
	execute(message, args) {
        message.channel.send(`This is off topic for this channel. See the channel description for more info on how to use this channel. Off topic discussion can be continued in <#${channelIDs.offTopic}>.`)
    }
}