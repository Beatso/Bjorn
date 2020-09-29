const {channelIDs} = require("../config.json")

module.exports = {
    name: "offtopic",
    cooldown: 10,
	execute(message, args) {
        message.delete()
            .catch((error)=>console.log(error))
            .then(()=>{
                console.log(message.author.tag+" triggered offtopic")
                message.channel.send(`This is off topic for this channel. See the channel description for more info on how to use this channel. Off topic discussion can be continued in <#${channelIDs.offTopic}>.`)
            })
    }
}