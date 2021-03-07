const Enmap = require ("enmap")
const {client} = require("./index.js")
const { prefix, blacklistedXPCategories, blacklistedXPChannels, timeBetweenXPMessages } = require("./config.json")

client.points = new Enmap({name: "points"})

const randBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

module.exports.getLevel = points =>  Math.floor(0.2 * Math.sqrt(points))

module.exports.giveXP = (member, amount, fromMessage) => {

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
		notificationPreference: "server",
		id: member.id
	})

	if (!client.points.get(member.id, "lastXPMessage"))
		client.points.set(member.id, Date.now() - timeBetweenXPMessages, "lastXPMessage")

	if (
		fromMessage &&
		Date.now() - client.points.get(member.id, "lastXPMessage") < 60
	) return

	// add points
	this.queryXP(member.id).points + amount < 0 // no negative xp!
		? client.points.set(member.id, 0, "points") // set to 0
		: client.points.math(member.id, "+", amount, "points") // subtract amount

	// levelling up
	const currentLevel = this.getLevel(client.points.get(member.id, "points")) // work out current level
	if (client.points.get(member.id, "level") != currentLevel) { // check if the level has changed
		client.points.set(member.id, currentLevel, "level") // update the level

		// notify user if they levelled up		
		if (currentLevel > 0) { // not if they reached level 0
			switch(client.points.get(member.id, "notificationPreference")) {
				case "server":
					let messageToSend = `${member.toString()}, you just reached level **${currentLevel}**!`
					if (currentLevel <= 5 && client.points.get(member.id, "notificationPreference") == "server") messageToSend += `\n**Hint**: use \`${prefix}notify [server | server-no-ping | dm | none]\` to change how you are notified about new levels.` // hint for new users to change notification preference
					client.channels.cache.get("749377732009525312").send(messageToSend) // main server #bot-spam
					// client.channels.cache.get("725272235090378806").send(messageToSend) // testing server #general
					break
				case "server-no-ping":
					client.channels.cache.get("749377732009525312").send( `**${member.user.username}**, you just reached level **${currentLevel}**!`) // main server #bot-spam
					// client.channels.cache.get("725272235090378806").send( `**${member.user.username}**, you just reached level **${currentLevel}**!`) // testing server #general
					break
				case "dm":
					member.user.send(`You just reached level **${currentLevel}** in **${member.guild.name}**!`)
					break
			}
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
		!( message.channel.guild.id == "738126248194211960" || message.channel.guild.id == "725272235090378803") // message is not in correct guild
		) return

	this.giveXP(message.member, randBetween(8, 12), true)

})

module.exports.sortRanks = guild => client.points.filter(element => guild.members.cache.has(element.id)).array().sort((a, b) => b.points - a.points) // returns a sorted array of all points objects

module.exports.cleanup = guild => { // remove points data from users not in guild
	const toRemove = client.points.filter(data => 
		!guild.members.cache.has(data.id) // user is not in guild
	)
	console.log(toRemove)
	toRemove.forEach(data => client.points.delete(data.id))
	return `Removed ${toRemove.size} members's points.`
} // eval to clean up: `?eval require("../levelling.js").cleanup(message.guild)`
