const { prefix } = require('../config.json');
const { footers } = require('../config.json');

module.exports = {
	name: 'help',
    description: 'List all of my commands or info about a specific command.',
    usage: `${prefix}help or ${prefix}help [command]`,
    cooldown: 5,
    type: "peasant",
	execute(message, args) {
        const { commands } = message.client;

        if (!args.length) {
            
            const commandsArray = commands.array(); 

            var peasantCommandsList = ""
            var adminCommandsList = ""
            
            for (i in commandsArray){
                commandNameFormatted = "`"+commandsArray[i].name+"`\n"
                if (commandsArray[i].type == "peasant") { peasantCommandsList=peasantCommandsList+commandNameFormatted; }
                else if (commandsArray[i].type == "admin") { adminCommandsList=adminCommandsList+commandNameFormatted; }
            }

            const commandsList = `Here's a list of all my commands:\n\n**Peasant Commands**\n${peasantCommandsList}\n**Supreme Leader Commands**\n${adminCommandsList}${`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`}`

            const helpEmbed = {
                "title": "Help",
                "description": commandsList,
                "color": 16087843,
                "footer": { "text": footers[Math.floor(Math.random()*footers.length)]}
            };

            return message.channel.send({embed: helpEmbed})
                .catch(error => {
                    console.error(`Could not give help to ${message.author.tag}.\n`, error);
                    message.reply('Well that didn\'t work. <@634776327299399721> save me');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        
        
        let helpname = "";
        let helpdesc = "";
        let helpusage = "";
        let helpcooldown = "";
        helpname = (`**Name:** ${command.name}\n`);
        if (command.description) helpdesc = (`**Description:** ${command.description}\n`);
        if (command.usage) helpusage = (`**Usage:** ${command.usage}\n`);
        helpcooldown = (`**Cooldown:** ${command.cooldown} second(s)\n`);
        
        const helpEmbed = {
            "title": "Help",
            "description": helpname+helpdesc+helpusage+helpcooldown,
            "color": 16087843,
            "footer": { "text": footers[Math.floor(Math.random()*footers.length)]}
        };

        return message.channel.send({embed: helpEmbed})
            .catch(error => {
                console.error(`Could not give help to ${message.author.tag}.\n`, error);
                message.reply('Well that didn\'t work. <@634776327299399721>, save me');
            });
        
    },
};