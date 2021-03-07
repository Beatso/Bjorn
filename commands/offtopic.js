const {channelIDs} = require("../config.json")

module.exports = {
    name: "offtopic",
    aliases: ["topic"],
    description: "Sends a message about a conversation being off topic.",
    availableTo: "@everyone",
	execute(message, args) {
        if (message.channel.id == channelIDs.offTopic) message.channel.send('You can\'t be off topic in off topic.')
        else message.channel.send(`This is off topic for this channel. See the channel description for more info on how to use this channel. Off topic discussion can be continued in <#${channelIDs.offTopic}>.`)
    }
}