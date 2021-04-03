const reactionRoleData = require('../reactionroles.json')

module.exports = {
        name: 'updaterr',
    description: "Updates reaction role messages.",
    availableTo: "<@634776327299399721>",
        async execute(message, args) {

			try {

                if (message.author.id != "634776327299399721") return

                let notificationDesc = 'React to this message to get roles to be pinged for announcements and events.\n'
                reactionRoleData.filter(e => e.type == "notification").forEach(e => notificationDesc += `\n${e.emoji} <@&${e.role}>${e.break ? '\n' : ''}`)

                let accessDesc = 'React to this message to get roles to see certain channels.\n'
                reactionRoleData.filter(e => e.type == "access").forEach(e => accessDesc += `\n${e.emoji} <@&${e.role}>${e.break ? '\n' : ''}`)

                let pronounDesc = 'React to this message to get roles to show people your pronouns.\n'
                reactionRoleData.filter(e => e.type == "pronoun").forEach(e => pronounDesc += `\n${e.emoji} <@&${e.role}>${e.break ? '\n' : ''}`)

                const notificationEmbed = {
                        "title": "🔔 Notification Roles",
                        "description": notificationDesc,
                        "color": message.guild.me.displayHexColor
                }
                const accessEmbed = {
                        "title": "🔓 Access Roles",
                        "description": accessDesc,
                        "color": message.guild.me.displayHexColor
                }
                const pronounsEmbed = {
                        "title": "🙋 Pronoun Roles",
                        "description": pronounDesc,
                        "color": message.guild.me.displayHexColor
                }

                const getRolesChannel = (await message.guild.channels.cache.get("740838518116319322"))

                const notificationMessage = (await getRolesChannel.messages.fetch("741544749235830796"))
				await notificationMessage.edit({embed: notificationEmbed})
                reactionRoleData.filter(e => e.type == "notification").forEach(async e => {await notificationMessage.react(e.emoji)})

                // const accessMessage = (await getRolesChannel.send({embed: accessEmbed}))
                // reactionRoleData.filter(e => e.type == "access").forEach(async e => {await accessMessage.react(e.emoji)})

                // const pronounsMessage = (await getRolesChannel.send({embed: pronounsEmbed}))
                // reactionRoleData.filter(e => e.type == "pronoun").forEach(async e => {await pronounsMessage.react(e.emoji)})
			
			} catch (error) {
				console.error(error)
			}

        },
};
