const fs = require('fs')
const Discord = require('discord.js')
const { prefix,channelIDs,color} = require('./config.json')
const reactionRoleData = require("./reactionroles.json")
require("dotenv").config()

module.exports.githubtoken=process.env.githubtoken
module.exports.beatsoghtoken=process.env.beatsoghtoken

const client = new Discord.Client({partials: ["MESSAGE","CHANNEL","REACTION"]})
client.commands = new Discord.Collection()
module.exports.client = client
const creationsWebhook = new Discord.WebhookClient(process.env.creationswebhookid,process.env.creationswebhooktoken)
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

client.once('ready', () => {
	console.log('bot running')
	client.user.setActivity("h",{type:"WATCHING"})
})

client.on('message', message => {
	if (!message.content.startsWith(prefix)) return

	const args = message.content.slice(prefix.length).split(/ +/)
	const commandName = args.shift().toLowerCase()
	
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		
	if (!command) return
	

	try {
		command.execute(message, args)
	} catch (error) {
		console.error(error)
		message.reply('there was an error trying to execute that command!')
	}
})

client.on("message", message => {

	if (
		message.channel.id!=channelIDs.communityCreations || // the message is not in community creations
		message.author.id==client.user.id || // the message was sent my the bot
		message.attachments.array().length>0 || // there is an attachment
		message.content.includes("http://") || // there is a link
		message.content.includes("https://") || // there is a link
		message.author.id=="634776327299399721" // beatso sent the message

	) return
	
	message.delete()
	message.reply("your message was deleted because it didn't have an attachment, image or link. Please use <#756241898439704618> for talking about creations posted in this channel.").then(response=>response.delete({timeout:15000}))

	if (message.member.nickname==null) name = message.author.username
	else name = message.member.nickname

	creationsWebhook.send(message.content, { username: name, avatarURL: message.author.avatarURL({dynamic:true}) } )

})

client.on('guildMemberAdd', member => {
	client.channels.cache.get("740632604071690281").send(`<:join:781306255033368609> <@${member.id}> joined the server. \`${member.guild.memberCount}\``)
	client.channels.cache.get("757300903819608146").setName(`Total Members: ${member.guild.memberCount}`)
	if (member.user.bot) member.roles.add(member.guild.roles.cache.find(role=>role.id=="750456891615871036")) // add bot role
	else member.roles.add(member.guild.roles.cache.find(role=>role.id=="764786089445556244")) // add member role
})
client.on('guildMemberRemove', member => {
	client.channels.cache.get("740632604071690281").send(`<:leave:781306268702343208> <@${member.id}> left the server. \`${member.guild.memberCount}\``)
	client.channels.cache.get("757300903819608146").setName(`Total Members: ${member.guild.memberCount}`)
})


client.on("messageReactionAdd", async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch()
	if (reaction.partial) await reaction.fetch()
	if  (!reaction.message.guild) return

	if (reaction.message.channel.id == channelIDs.getRoles) {

		const name = reactionRoleData.map(x=>x.name).indexOf(reaction.emoji.name)
		const id = reactionRoleData.map(x=>x.id).indexOf(reaction.emoji.id)

		if ( name != -1 || id != -1 ) {
			if ( name != -1 ) var data = reactionRoleData[name]
			else var data = reactionRoleData[id]
			if ( reaction.message.id == data.messageID ) await reaction.message.guild.members.cache.get(user.id).roles.add(data.role)
		}

	}


	// starboard
	if (reaction.emoji.name=="⭐") {
		const message = reaction.message
		const reactionData = message.reactions.cache.get("⭐")
		if (reactionData.count==5 && !reactionData.users.cache.has(client.user.id)) {
			if (message.member.nickname==null) name = message.author.username
			else name = `${message.member.nickname} (${message.author.username})`
			message.react("⭐")
			const embed = {
				color: 15844367,
				author: {
					name: name,
					icon_url: message.author.avatarURL()
				},
				description: message.content,
				fields: [{
					"name": "Original",
					"value": `[Jump](${message.url})`
				}],
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

		const name = reactionRoleData.map(x=>x.name).indexOf(reaction.emoji.name)
		const id = reactionRoleData.map(x=>x.id).indexOf(reaction.emoji.id)

		if ( name != -1 || id != -1 ) {
			if ( name != -1 ) var data = reactionRoleData[name]
			else var data = reactionRoleData[id]
			if ( reaction.message.id == data.messageID ) await reaction.message.guild.members.cache.get(user.id).roles.remove(data.role)
		}

	}

})

client.on("message", message => {
	if (
		(
			message.content.includes("discord.gg") ||
			message.content.includes("discord.com/invite")
		) &&
		!message.author.user.id == "634776327299399721"
	) {
		message.delete().then(message => message.reply("don't send invite links!"))
	}
})

client.login(process.env.discordtoken)