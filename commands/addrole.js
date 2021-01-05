module.exports = {
	name: 'addrole',
	description: "Creates a new role with default permissions.",
	aliases: ["newrole"],
	usage: "[name]",
	availableTo: "<&739379990415540267>", // moderator role id
	execute(message, args) {
		if (!message.member.roles.cache.some(role => role.id == "739379990415540267")) message.delete().then(message.channel.send("This command is only available to moderators.").then(message=>message.delete({timeout:10000}))).catch((error)=>console.error(error)) // moderator role id
		else {
			if (args.length=0) message.channel.send("Specify a role name!")
			else {
			// add role
			message.guild.roles.create ({
				data : {
					name : args.join(" ")
				},
				reason: `Created by ${message.author.tag}`
			})
				.then(role => {
					message.channel.send(`Created role ${role.toString()}`)
				})
			}
		}
	}
}
