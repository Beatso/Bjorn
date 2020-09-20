module.exports = {
    name: 'selfrole',
    cooldown: 5,
	execute(message, args) {
		try {
			var roleID
			var changeRoles
			const roleData = [
				{ "keyword": "join-leave", "roleID": "757303116264767519" },
				{ "keyword": "variated", "roleID": "757302845862314035" },
				{ "keyword": "custom", "roleID": "757303089626611754" }
			]
			const keywordsList = roleData.map(x=>x.keyword)
			if (keywordsList.includes(args[0])) {
				const roleID = roleData[keywordsList.indexOf(args[0])].roleID
				const role = message.guild.roles.cache.get(roleID)
				if (!message.member.roles.cache.some(x=>x.id==roleID)) {
					message.member.roles.add(role)
					message.channel.send(`Gave role \`${role.name}\` to <@${message.author.id}>.`)
				} else {
					message.member.roles.remove(role)
					message.channel.send(`Removed role \`${role.name}\` from <@${message.author.id}>.`)
				}
			} else {
				console.log(changeRoles)
				message.reply("See this message for more info on how to use the command:\n")
			}
		} catch (error) {console.error(error)}
    }
};