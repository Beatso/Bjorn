const { prefix } = require('../config.json');
const { footers } = require('../config.json');

module.exports = {
    name: 'archive',
    description: 'locks a channel and moves it to the archive category',
    usage: `${prefix}archive`,
    type: "admin",
    cooldown: 0,
	execute(message, args) {
        if (message.author.id === '634776327299399721') {

            let category = message.guild.channels.cache.find(c => c.id == "727973056311590983")
            message.channel.setParent(category.id);
            message.channel.lockPermissions()

            const archiveEmbed = {
                "title": ":card_box: Channel Archived",
                "description": "This channel has been archived. Messages can no longer be sent and this channel is read-only.",
                "color": 16087843,
                "footer": {
                  "text": footers[Math.floor(Math.random()*footers.length)]
                }
            };
            message.channel.bulkDelete(1);
            message.channel.send({embed:archiveEmbed})
            setTimeout(function() {
                lastMessage = message.channel.messages.cache.first(1)
                lastMessage[0].pin()
            }, 3000);


        }
    },
};