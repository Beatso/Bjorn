const { footers } = require('../config.json');
const { prefix } = require('../config.json');


module.exports = {
    name: 'spam',
    description: 'deletes spam and displays info',
    usage: `${prefix}spam [messages to delete] [seconds]`,
    cooldown: 0,
    type: "admin",
    aliases: ["a"],
	execute(message, args) {
        if (message.author.id === '634776327299399721') {

            message.channel.messages.fetch({ limit: 1 }).then(messages => {
                
                let messagesToDelete = args[0]
                if (messagesToDelete == undefined) { messagesToDelete=0; } 
                messagesToDelete++;
                message.channel.bulkDelete(messagesToDelete);
                
                let deleteTimeout = args[1];
                if (deleteTimeout == undefined) { deleteTimeout=30; }
                
    
                const offTopicEmbed = {
                    "title": "Messages marked as spam",
                    "description": "Please do not spam. If you want to use bot commands etc, use <#668183541561163794>.",
                    "color": 16087843,
                    "footer": { "text": `This message will self destruct in ${deleteTimeout} seconds.` }
                };
                deleteTimeout=deleteTimeout*1000;
                message.channel.send({ embed: offTopicEmbed }).then (message => {
                    message.delete({ timeout: deleteTimeout });
                });
                  
            })
    
        } else {
            message.channel.bulkDelete(1);
            message.author.send("Stupid, don't try and use admin commands.");
        }
	},
};