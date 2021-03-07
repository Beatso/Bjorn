module.exports = {
	name: 'restart',
	description: "Restarts the bot.",
	availableTo: "<@&739379990415540267>", // moderator role id
	execute(message, args) {
		if (!message.member.roles.cache.some(role => role.id == "739379990415540267")) message.delete().then(message.channel.send("This command is only available to moderators.").then(message=>message.delete({timeout:10000}))).catch((error)=>console.error(error)) // moderator role id
		else {
			message.react("✅").then(()=>process.exit())
		}
	}
}
