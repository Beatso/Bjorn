const Enmap = require ("enmap")
const {client} = require("./index.js")
const { prefix, blacklistedXPCategories, blacklistedXPChannels, timeBetweenXPMessages } = require("./config.json")

client.points = new Enmap({name: "points"})

const randBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

module.exports.giveXP = (member, amount, fromMessage) => {

	console.log(member)

	if (member.user.bot)
		return {
			success: false,
			reason: "Cannot give experience to bots"
		}

	if (Number.isNaN(amount))
		return {
			success: false,
			reason: "Amount was not a whole number."
		}

	if (!Number.isInteger(amount))
		return {
			success: false,
			reason: "Amount must be a whole number."
		}

	client.points.ensure(member.id, {
		points: 0,
		level: 1,
		notificationPreference: "server"
	})

	if (!client.points.get(member.id, "lastXPMessage"))
		client.points.set(member.id, Date.now() - timeBetweenXPMessages, "lastXPMessage")

	if (
		fromMessage &&
		Date.now() - client.points.get(member.id, "lastXPMessage") < 60
	) return

	// add points
	client.points.math(member.id, "+", amount, "points")

	// levelling up
	const currentLevel = Math.floor(0.2 * Math.sqrt(client.points.get(member.id, "points"))) // work out evaulate current level
	if (client.points.get(member.id, "level") != currentLevel) { // check if the level has changed
		client.points.set(member.id, currentLevel, "level") // update the level

		// notify user if they levelled up		
		switch(client.points.get(member.id, "notificationPreference")) {
			case "server":
				let messageToSend = `${member.toString()}, you just reached level **${currentLevel}**!`
				if (currentLevel <= 5 && client.points.get(member.id, "notificationPreference") == "server") messageToSend += `\n**Hint**: use \`${prefix}notify\` to change how I tell you this, or disable it all together.` // hint for new users to change notification preference
				// client.channels.cache.get("749377732009525312").send(messageToSend) // main server bot spam
				client.channels.cache.get("725272235090378806").send(messageToSend) // testing server
				break
			case "dm":
				member.user.send(`You just reached level **${currentLevel}** in **${member.guild.name}**!`)
				break
		}
	}

	return {
		success: true
	}
}

module.exports.queryXP = id => client.points.get(id)

// give xp for messages sent
client.on("message", message => {

	const commandName = message.content.slice(prefix.length).split(/ +/).shift().toLowerCase()
	
	if (
		message.author.bot || // message was sent by a bot
		blacklistedXPChannels.includes(message.channel.id) || // message is in blacklisted channel
		(message.content.startsWith(prefix) && (
			client.commands.get(commandName) || // is a command
			client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) // is a command alias
		)) ||
		message.channel.type == "dm" || // message is in dms
		blacklistedXPCategories.includes(message.channel.parentID) || // message is in blacklisted category
		// message.channel.guild.id != "738126248194211960" // message is not in correct guild
		message.channel.guild.id != "725272235090378803" // message is not in correct guild
		) return

	this.giveXP(message.member, randBetween(8, 12), true)
	message.reply("given xp")

})
