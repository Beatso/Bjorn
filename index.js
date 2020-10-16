const fs = require('fs')
const Discord = require('discord.js')
const { prefix,channelIDs,color} = require('./config.json')
require("dotenv").config()
const keepAlive = require('./server')

const client = new Discord.Client({partials: ["MESSAGE","CHANNEL","REACTION"]})
client.commands = new Discord.Collection()
module.exports.client = client
const creationsWebhook = new Discord.WebhookClient(process.env.creationswebhookid,process.env.creationswebhooktoken)
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const cooldowns = new Discord.Collection()
for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

client.once('ready', () => {
	console.log('bot running')
	client.user.setActivity("a game")
})

client.on('message', message => {
	if (!message.content.startsWith(prefix)) return

	const args = message.content.slice(prefix.length).split(/ +/)
	const command = args.shift().toLowerCase()
	
	if (!client.commands.has(command)) return

	// cooldown stuff
	if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection())
	const now = Date.now()
	const timestamps = cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || 3) * 1000
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing that command.`)
		}
	}
	timestamps.set(message.author.id, now)
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

	try {
		client.commands.get(command).execute(message, args)
	} catch (error) {
		console.error(error)
		message.reply('there was an error trying to execute that command!')
	}
})

client.on("message", message => {
	if (message.channel.id!=channelIDs.communityCreations||message.author.id==client.user.id) return
	if (
		message.attachments.array().length==0 && // there is not an attachment
		!message.content.includes("http://") && // there not is a link
		!message.content.includes("https://") //there is not a link
	) {
		message.delete()
		message.reply("your message was deleted because it didn't have an attachment, image or link. Please use <#756241898439704618> for talking about creations posted in this channel.").then(response=>response.delete({timeout:15000}))
		creationsWebhook.send(message.content,{username:message.author.username,avatarURL:message.author.avatarURL({dynamic:true})})
	}
})

client.on('guildMemberAdd', member => {
	client.channels.cache.get("740632604071690281").send(`<@${member.id}> joined the server. \`${member.guild.memberCount}\``)
	client.channels.cache.get("757300903819608146").setName(`Total Members: ${member.guild.memberCount}`)
	member.roles.add(member.guild.roles.cache.find(role=>role.id=="764786089445556244")) // add member role
})
client.on('guildMemberRemove', member => {
	client.channels.cache.get("740632604071690281").send(`<@${member.id}> left the server. \`${member.guild.memberCount}\``)
	client.channels.cache.get("757300903819608146").setName(`Total Members: ${member.guild.memberCount}`)
})


client.on("messageReactionAdd", async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch()
	if (reaction.partial) await reaction.fetch()
	if  (!reaction.message.guild) return

	if (reaction.message.channel.id == channelIDs.getRoles) {
		if (reaction.emoji.name == "🟢") { await reaction.message.guild.members.cache.get(user.id).roles.add("740902139416674345") }
		else if (reaction.emoji.name == "🔴") { await reaction.message.guild.members.cache.get(user.id).roles.add("740955501595983872") }
		else if (reaction.emoji.name == "🔵") { await reaction.message.guild.members.cache.get(user.id).roles.add("752975214140194817") }
		else if (reaction.emoji.name == "🟠") { await reaction.message.guild.members.cache.get(user.id).roles.add("740955812481990717") }
		else if (reaction.emoji.name == "⚪") { await reaction.message.guild.members.cache.get(user.id).roles.add("740955847517274113") }
		else if (reaction.emoji.name == "🟣") { await reaction.message.guild.members.cache.get(user.id).roles.add("752975147815665675") }
		else if (reaction.emoji.name == "🟤") { await reaction.message.guild.members.cache.get(user.id).roles.add("750442200302747669") }
	}

	if (reaction.emoji.name=="⭐") {
		const message = reaction.message
		const reactionData = message.reactions.cache.get("⭐")
		if (reactionData.count==5 && !reactionData.users.cache.has(client.user.id)) {
			message.react("⭐")
			const embed = {
				color: 15844367,
				author: {
					name: message.author.username,
					icon_url: message.author.avatarURL(),
					url: message.url
				},
				description: message.content,
				footer: { text: "#"+message.channel.name }
			}
			if (message.attachments.size!=0) embed.image = { url: message.attachments.entries().next().value[1].attachment }
			client.channels.cache.get("759888269495894089").send({embed:embed})
		}
	}
})

client.on("messageReactionRemove", async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch()
	if (reaction.partial) await reaction.fetch()
	if  (!reaction.message.guild) return

	if (reaction.message.channel.id == channelIDs.getRoles) {
		if (reaction.emoji.name == "🟢") { await reaction.message.guild.members.cache.get(user.id).roles.remove("740902139416674345") }
		else if (reaction.emoji.name == "🔴") { await reaction.message.guild.members.cache.get(user.id).roles.remove("740955501595983872") }
		else if (reaction.emoji.name == "🔵") { await reaction.message.guild.members.cache.get(user.id).roles.remove("752975214140194817") }
		else if (reaction.emoji.name == "🟠") { await reaction.message.guild.members.cache.get(user.id).roles.remove("740955812481990717") }
		else if (reaction.emoji.name == "⚪") { await reaction.message.guild.members.cache.get(user.id).roles.remove("740955847517274113") }
		else if (reaction.emoji.name == "🟣") { await reaction.message.guild.members.cache.get(user.id).roles.remove("752975147815665675") }
		else if (reaction.emoji.name == "🟤") { await reaction.message.guild.members.cache.get(user.id).roles.remove("750442200302747669") }
	}
})

keepAlive()
client.login(process.env.discordtoken)