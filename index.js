const fs = require('fs')
const Discord = require('discord.js')
const { prefix,channelIDs,defaultCooldown,inPublicVCRoleID,inLockedVCRoleID} = require('./config.json')
const reactionRoleData = require("./reactionroles.json")
require("dotenv").config()
const axios = require('axios').default

module.exports.githubtoken=process.env.githubtoken
module.exports.beatsoghtoken=process.env.beatsoghtoken

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
	client.user.setActivity("dms",{type:"WATCHING"})
})

const tryChat = async message => {
	if (!message.guild)
		return message.reply(
			(await axios.get(`https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(message.content)}&uid=${message.author.id}${
				process.env.monkedevkey ? `&key=${process.env.monkedevkey}` : ''
			}`)).data.response,
			{ allowedMentions: { repliedUser: false } }
		)
}

client.on('message', message => {
	if (message.author.bot) return

	if ( // no commands in #creations
		message.channel.id==channelIDs.communityCreations &&
		!message.member.hasPermission('MANAGE_MESSAGES')
	) return

	if (!message.content.startsWith(prefix)) return tryChat(message)

	const args = message.content.slice(prefix.length).split(/ +/)
	const commandName = args.shift().toLowerCase()
	
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		
	if (!command) return tryChat(message)
	


	if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection())

	const now = Date.now()
	const timestamps = cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || defaultCooldown) * 1000

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000
			return message.reply(`You're on cooldown! Please wait ${timeLeft.toFixed(1)} more seconds before using that command again.`)
		}
	}

	timestamps.set(message.author.id, now)
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

	

	try {
		command.execute(message, args)
	} catch (error) {
		console.error(error)
		message.reply('There was an error trying to execute that command!')
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
	message.reply("Your message was deleted because it didn't have an attachment, image or link. Please use <#756241898439704618> for talking about creations posted in this channel.").then(response=>response.delete({timeout:15000}))

	if (message.member.nickname==null) name = message.author.username
	else name = message.member.nickname

	creationsWebhook.send(message.content, { username: name, avatarURL: message.author.avatarURL({dynamic:true}), disableMentions: "all" })

})

client.on('guildMemberAdd', member => {
	client.channels.cache.get("740632604071690281").send(`<:join:781306255033368609> <@${member.id}> joined the server. \`${member.guild.memberCount}\``)
	client.channels.cache.get("740632604071690281").setTopic(`Total Members: ${member.guild.memberCount}`)
	if (member.user.bot) member.roles.add(member.guild.roles.cache.find(role=>role.id=="750456891615871036")) // add bot role
	else member.roles.add(member.guild.roles.cache.find(role=>role.id=="764786089445556244")) // add member role
})
client.on('guildMemberRemove', member => {
	client.channels.cache.get("740632604071690281").send(`<:leave:781306268702343208> <@${member.id}> left the server. \`${member.guild.memberCount}\``)
	client.channels.cache.get("740632604071690281").setTopic(`Total Members: ${member.guild.memberCount}`)
})


client.on("messageReactionAdd", async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch()
	if (reaction.partial) await reaction.fetch()
	if (!reaction.message.guild) return

	if (
		reaction.message.channel.id == channelIDs.getRoles &&
		reactionRoleData.some(e => e.emoji == reaction.emoji.name) &&
		!user.bot
	)
		reaction.message.guild.members.cache.get(user.id).roles.add(reactionRoleData.find(e => e.emoji == reaction.emoji.name).role)


	// starboard
	if (reaction.emoji.name=="⭐") {

		const message = reaction.message
		const reactionData = message.reactions.cache.get("⭐")

		if (
			user.bot // ignore reactions from bots
		) return 

		if (user.id == message.author.id) return reaction.users.remove(message.author) // remove reactions from message author

		// add message to starboard
		if (
			reactionData.count == 5 && // the message has 5 reactions 
			!reactionData.users.cache.has(client.user.id) // the bot hasn't reacted yet (to prevent messages going to starboard twice)
		) {

			message.react("⭐")
			const embed = {
				color: 15844367,
				author: {
					name: message.author.tag,
					icon_url: message.author.avatarURL()
				},
				description: message.content,
				fields: [
					{
						"name": "Original Message",
						"value": `[Jump](${message.url})`,
						"inline": true
					},
					{
						"name": "Channel",
						"value": message.channel.toString(),
						"inline": true
					}
				],
				footer: { text: message.id }
			}
			if (message.attachments.size!=0) embed.image = { url: message.attachments.entries().next().value[1].attachment }
			client.channels.cache.get("759888269495894089").send({embed:embed})
			require("./levelling.js").giveXP(message.member, 30, false) // give 30 xp for starboard

		}
	}
})

client.on("messageReactionRemove", async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch()
	if (reaction.partial) await reaction.fetch()

	if (
		reaction.message.channel.id == channelIDs.getRoles &&
		reactionRoleData.some(e => e.emoji == reaction.emoji.name) &&
		!user.bot
	)
		reaction.message.guild.members.cache.get(user.id).roles.remove(reactionRoleData.find(e => e.emoji == reaction.emoji.name).role)

})

client.on("message", message => {
	if (
		(
			message.content.includes("discord.gg") ||
			message.content.includes("discord.com/invite")
		) &&
		message.author.id != "634776327299399721"
	) {
		message.delete().then(message => message.reply("don't send invite links!"))
	}
})

const deleteMessageLog = message => {
	message.guild.channels.cache.get('840706855595933718').send(
		new Discord.MessageEmbed()
			.setTitle('Message Deleted')
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setDescription(message.content)
			.setFooter(`#${message.channel.name}`)
			.setColor('RED')
	)
}

client.on('messageDelete', message => 
	deleteMessageLog(message)
)

client.on('messageDeleteBulk', messages => {
	messages.each(message => 
		deleteMessageLog(message)
	)
})

client.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.content == newMessage.content) return
	newMessage.guild.channels.cache.get('840706855595933718').send(
		new Discord.MessageEmbed()
			.setTitle('Message Edited')
			.setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL())
			.addField('Old Content', oldMessage.content)
			.addField('New Content', newMessage.content)
			.setFooter(`#${newMessage.channel.name}`)
			.setColor('YELLOW')
	)
})

client.login(process.env.discordtoken)

require("./levelling.js")
