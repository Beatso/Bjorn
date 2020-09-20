module.exports = {
    name: 'selfrole',
    cooldown: 5,
	execute(message, args) {
		try {
			let roleID
			let changeRoles
			switch (args[0]) {
				case "join-leave":
					changeRoles=true
					roleID="757303116264767519"
				case "variated":
					changeRoles=true
					roleID="757302845862314035"
				case "custom":
					changeRoles=true
					roleID="757303089626611754"
				default:
					changeRoles=false
			}
			if (changeRoles) {
				const role = message.guild.roles.get(roleID)
				if (message.member.roles.has(role)) {
					message.member.addRole(role)
					message.channel.send(`Gave role \`${role.name}\` to <@${message.author.id}>.`)
				} else {
					message.member.removeRole(role)
					message.channel.send(`Removed role \`${role.name}\` to <@${message.author.id}>.`)
				}
			} else {
				message.reply("See this message for more info on how to use the command:\n")
			}
		} catch (error) {console.error(error)}
    }
};