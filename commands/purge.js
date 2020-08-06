const { prefix } = require('../config.json');


module.exports = {
    name: 'purge',
    cooldown: 0,
    type: "admin",
	execute(message, args) {
        if (message.member.roles.cache.some(role => role.id == '739379990415540267')) {

            message.channel.messages.fetch({ limit: 1 }).then(messages => {
                
                let messagesToDelete = args[0]
                if (messagesToDelete == undefined) { messagesToDelete=0; } 
                messagesToDelete++;
                message.channel.bulkDelete(messagesToDelete);

                message.channel.send(`🚫 Deleted ${messagesToDelete-1} messages.`).then (message => {
                    message.delete({ timeout: 3000 });
                });                                  
            })
    
        } else {
            message.channel.bulkDelete(1);
            message.author.send("Stupid, don't try and use admin commands.");
        }
	},
};