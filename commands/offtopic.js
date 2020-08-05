const { footers } = require('../config.json');
const { prefix } = require('../config.json');
const config = require('../config.json');
const Discord = require('discord.js');
const { client } = require ("../index.js")


const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

module.exports = {
    name: 'offtopic',
    type: "admin",
    description: 'moves offtopic messages and displays info',
    usage: `${prefix}offtopic [messages to move] [seconds]`,
    cooldown: 15,
	execute(message, args) {
        if (message.author.id === '634776327299399721') {

            message.channel.messages.fetch({ limit: 1 }).then(messages => {
                
                let messagesToAct = args[0]

                lastMessages = message.channel.messages.cache.first(messagesToAct)
                for (i in lastMessages) {
                    messageAvatar = lastMessages[i].author.displayAvatarURL()
                    messageUsername = lastMessages[i].author.username
                    webhookClient.send(lastMessages[i].content, {
                        username: messageUsername,
                        avatarURL: messageAvatar,
                    });
                }

                if (messagesToAct == undefined) { messagesToAct=0; } 
                messagesToAct++;
                message.channel.bulkDelete(messagesToAct);
                
                let deleteTimeout = args[1];
                if (deleteTimeout == undefined) { deleteTimeout=30; }
                
    
                const offTopicEmbed = {
                    "title": "Message off topic",
                    "description": "This channel is for messages about the server **only**. Your messages have been moved to <#698551742857478159>.",
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