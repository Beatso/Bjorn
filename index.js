const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client({partials: ["MESSAGE","CHANNEL","REACTION"]});
client.commands = new Discord.Collection();

module.exports.client = client;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const cooldowns = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('cards');
	

});

client.on('message', message => {
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if (!client.commands.has(command)) return;

	// cooldown stuff
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing that command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('guildMemberAdd', member => {
	client.channels.cache.get('740632604071690281').send(`<@${member.id}> joined the server. \`${member.guild.memberCount}\``);
});
client.on('guildMemberRemove', member => {
	client.channels.cache.get('740632604071690281').send(`<@${member.id}> left the server. \`${member.guild.memberCount}\``);
});


client.on("messageReactionAdd", async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();

	if  (!reaction.message.guild) return;

	if (reaction.message.channel.id == "740838518116319322") {
		if (reaction.emoji.name == "🟢") { await reaction.message.guild.members.cache.get(user.id).roles.add("740902139416674345") }
		else if (reaction.emoji.name == "🔴") { await reaction.message.guild.members.cache.get(user.id).roles.add("740955501595983872") }
		else if (reaction.emoji.name == "🔵") { await reaction.message.guild.members.cache.get(user.id).roles.add("740955615567937596") }
		else if (reaction.emoji.name == "🟠") { await reaction.message.guild.members.cache.get(user.id).roles.add("740955812481990717") }
		else if (reaction.emoji.name == "⚪") { await reaction.message.guild.members.cache.get(user.id).roles.add("740955847517274113") }
		else if (reaction.emoji.name == "🟣") { await reaction.message.guild.members.cache.get(user.id).roles.add("740955885115015208") }
	}
})

client.on("messageReactionRemove", async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();

	if  (!reaction.message.guild) return;

	if (reaction.message.channel.id == "740838518116319322") {
		if (reaction.emoji.name == "🟢") { await reaction.message.guild.members.cache.get(user.id).roles.remove("740902139416674345") }
		else if (reaction.emoji.name == "🔴") { await reaction.message.guild.members.cache.get(user.id).roles.remove("740955501595983872") }
		else if (reaction.emoji.name == "🔵") { await reaction.message.guild.members.cache.get(user.id).roles.remove("740955615567937596") }
		else if (reaction.emoji.name == "🟠") { await reaction.message.guild.members.cache.get(user.id).roles.remove("740955812481990717") }
		else if (reaction.emoji.name == "⚪") { await reaction.message.guild.members.cache.get(user.id).roles.remove("740955847517274113") }
		else if (reaction.emoji.name == "🟣") { await reaction.message.guild.members.cache.get(user.id).roles.remove("740955885115015208") }
	}
})

client.login(token);