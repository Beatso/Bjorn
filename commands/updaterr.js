const reactionRoleData = require('../reactionroles.json')

module.exports = {
	name: 'updaterr',
    description: "Updates reaction role messages.",
    availableTo: "<@634776327299399721>",
	async execute(message, args) {

		if (message.author.id != "634776327299399721") return

		let notificationDesc = ''
		reactionRoleData.filter(e => e.type == "notification").forEach(e => notificationDesc += `${e.emoji} <@${e.role}>`)
		
		let accessDesc = ''
		reactionRoleData.filter(e => e.type == "access").forEach(e => accessDesc += `${e.emoji} <@${e.role}>`)

		let pronounDesc = ''
		reactionRoleData.filter(e => e.type == "pronoun").forEach(e => pronounDesc += `${e.emoji} <@${e.role}>`)

		const notificationEmbed = {
			"title": "🔔 Notification Roles",
			"description": notificationDesc,
			"color": message.guild.me.displayHexColor
		}
		const accessEmbed = {
			"title": "👁‍🗨 Get Access Roles",
			"description": accessDesc,
			"color": message.guild.me.displayHexColor
		}
		const pronounsEmbed = {
			"title": "🙋 Get Pronoun Roles",
			"description": pronounDesc,
			"color": message.guild.me.displayHexColor
		}

		const getRolesChannel = await message.guild.channels.cache.get("740838518116319322")

		const notificationMessage = await getRolesChannel.send(notificationEmbed)
		reactionRoleData.filter(e => e.type == "notification").forEach(e => await notificationMessage.react(e.emoji))
		
		const accessMessage = await getRolesChannel.send(accessEmbed)
		reactionRoleData.filter(e => e.type == "access").forEach(e => await accessMessage.react(e.emoji))

		const pronounsMessage = await getRolesChannel.send(pronounsEmbed)
		reactionRoleData.filter(e => e.type == "pronouns").forEach(e => await pronounsMessage.react(e.emoji))

		
	},
};
