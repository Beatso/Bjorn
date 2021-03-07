const fs = require('fs')
const Discord = require('discord.js')
const { prefix,channelIDs,defaultCooldown,inPublicVCRoleID,inLockedVCRoleID} = require('./config.json')
const googleTTS = require('google-tts-api')
const reactionRoleData = require("./reactionroles.json")
require("dotenv").config()

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
	client.user.setActivity("h",{type:"WATCHING"})
})

client.on('message', message => {
	if (!message.content.startsWith(prefix)) return

	const args = message.content.slice(prefix.length).split(/ +/)
	const commandName = args.shift().toLowerCase()
	
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		
	if (!command) return
	


	if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection())

	const now = Date.now()
	const timestamps = cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || defaultCooldown) * 1000

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000
			return message.reply(`you're on cooldown! Please wait ${timeLeft.toFixed(1)} more seconds before using that command again.`)
		}
	}

	timestamps.set(message.author.id, now)
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

	

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

		if (
			user.id == message.author.id || // ignore reactions from the message author
			user.bot // ignore reactions from bots
		) return 

		// add message to starboard
		if (
			reactionData.count == 5 && // the message has 5 reactions 
			!reactionData.users.cache.has(client.user.id) // the bot hasn't reacted yet (to prevent messages going to starboard twice)
		) {

			message.react("⭐")
			const embed = {
				color: 15844367,
				author: {
					name: message.member.nickname==null ? message.author.username : `${message.member.nickname} (${message.author.username})`,
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
					},
					{
						"name": "Time",
						"value": message.createdAt.toUTCString(),
						"inline": true
					}
				],
				footer: { text: message.id }
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
		message.author.id != "634776327299399721"
	) {
		message.delete().then(message => message.reply("don't send invite links!"))
	}
})

// detect when a member joins or leaves a voice channel, and give them the role if applicable
client.on("voiceStateUpdate", (oldState, newState) => {

	if (oldState.member.user.bot) return

	if (oldState.channelID!=null && newState.channelID==null) {
		join = false
		leave = true
	}
	else if (oldState.channelID==null && newState.channelID!=null) {
		join = true
		leave = false
	} else if (oldState.channelID!=null && newState.channelID!=null && oldState.channelID!=newState.channelID) {
		join = true
		leave = true
	}
	else return

	if (leave) {
			
		if (
			newState.guild.me.voice.channelID != null &&
			newState.guild.me.voice.channel.members.filter(member => !member.user.bot).size <= 1
		) newState.guild.me.voice.channel.leave()

		if (oldState.channelID == '757326822936543332') newState.member.roles.remove(oldState.guild.roles.cache.get(inPublicVCRoleID))	
		else if (oldState.channelID == '806889275173109770') newState.member.roles.remove(oldState.guild.roles.cache.get(inLockedVCRoleID))

	}

	if (join) {
		if (newState.channelID == '757326822936543332') newState.member.roles.add(oldState.guild.roles.cache.get(inPublicVCRoleID))	
		else if (newState.channelID == '806889275173109770') newState.member.roles.add(oldState.guild.roles.cache.get(inLockedVCRoleID))
	}
})

client.on('message', async message => {

	if (!message.channel.name.startsWith('tts')) return // not in tts text channel 

	if (message.member.voice.channelID != null && message.guild.me.voice.channelID == null) await message.member.voice.channel.join() // join the channel if not already in a channel and the user is in a channel
	
	if (
		message.guild.me.voice.channelID != message.member.voice.channelID || // the bot and member are in different channels
		message.content.length > 100 || // the message is over 100 chars
		message.member.voice.channelID == null || // author is not in a vc in this server
		message.author.bot // author is a bot
	) return message.react('⚠️') // let the user know it failed

	message.guild.voice.connection.play(googleTTS.getAudioUrl(`${message.member.nickname ? message.member.nickname : message.author.username} says ${message.cleanContent}`)) // play
	message.react('✅') // let the user know it worked
	
})

client.login(process.env.discordtoken)

require("./levelling.js")
