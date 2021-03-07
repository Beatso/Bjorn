const { prefix, color } = require('../config.json')

module.exports = {
	name: "help",
	usage: "<command>",
	aliases: ["commands", "hjalp"],
	description: "Shows a list of commands, or info about a particular command.",
	availableTo: "@everyone",
	execute(message, args) {
		
		const { commands } = message.client

		if(!args.length) {
			const data = []
			data.push('Here\'s a list of all my commands:');
			data.push("`"+commands.map(command => command.name).join('`, `')+"`");
			data.push(`\nYou can also use \`${prefix}help [command name]\` to get info on a specific command!`);
			
			return message.channel.send(data, { split: true })
				.catch(error => {
					console.error(error);
				});			
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) return message.reply('that\'s not a valid command!')

		const responseEmbed = {
			"title": "Command Info",
			"color": color,
			"fields": []
		}

		responseEmbed.fields.push({"name": "Name", "value": "`"+command.name+"`"})
		if (command.aliases) responseEmbed.fields.push({"name": "Aliases", "value": "`"+command.aliases.join("`, `")+"`"})
		if (command.description) responseEmbed.fields.push({"name": "Description", "value": command.description})
		if (command.usage) responseEmbed.fields.push({"name": "Usage", "value": `${prefix}${name} ${command.usage}`})
		if (command.parameters) responseEmbed.fields.push({"name": "Parameters", "value": command.parameters})
		if (command.availableTo) responseEmbed.fields.push({"name": "Available To", "value": command.availableTo})
		
		message.channel.send({ embed: responseEmbed });


    }
}