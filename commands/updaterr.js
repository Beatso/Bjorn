module.exports = {
	name: 'updaterr',
    description: "Updates reaction role messages.",
    availableTo: "<@634776327299399721>",
	execute(message, args) {
		if (message.author.id!=634776327299399721) return
		const notificationEmbed = {
			"title": "🔔 Get Notification Roles",
			"description": "React to this message with the relevant emojis to be notified for updates to certain packs.",
			"color": 16087843,
			"fields": [
				{
					"name": ":green_circle:",
					"value": "[Little Improvements: Variated](https://www.planetminecraft.com/texture-pack/little-improvements-variated/)",
					"inline": true
				},
				{
					"name": ":red_circle:",
					"value": "[Little Improvements: Redstone](https://www.planetminecraft.com/texture-pack/little-improvements-redstone/)",
					"inline": true
				},
				{
					"name": ":blue_circle:",
					"value": "[Little Improvements: Custom](https://www.littleimprovements-custom.tk/)",
					"inline": true
				},
				{
					"name": ":orange_circle:",
					"value": "[New Resource Packs](https://www.planetminecraft.com/member/beatso/submissions/texture-packs/)",
					"inline": true
				},
				{
					"name": ":white_circle:",
					"value": "[Resource Pack Info](https://www.beatso.tk/resource-pack-info)",
					"inline": true
				},
				{
					"name": ":purple_circle:",
					"value": "[Roundup](https://discord.com/channels/738126248194211960/747855771454144653)",
					"inline": true
				},
				{
					"name": ":brown_circle:",
					"value": "[Simple Auto Clicker](https://www.planetminecraft.com/mod/simple-auto-clicker/)",
					"inline": true
				},
				{
					"name": ":yellow_circle:",
					"value": "[Question of the Day](https://discord.com/channels/738126248194211960/785921209338298408)",
					"inline": true
				},
				{
					"name": ":black_circle:",
					"value": "[Song of the Day](https://discord.com/channels/738126248194211960/789287836943122442)",
					"inline": true
				}
			]
		}
		const accessEmbed = {
			"title": "👁‍🗨 Get Access Roles",
			"description": "React to this message with the relevant emojis to get access to see particular channels.",
			"color": 16087843,
			"fields": [
				{
					"name": "👋 #join-leave",
					"value": "Logs of people joining and leaving the server, plus total member count.",
					"inline": false
				},
				{
					"name": "<:fingermaps:769602982579798054> #fingermaps",
					"value": "Announcements for [FingerMaps](https://fingermaps.net/), the map making team that Beatso is a part of.",
					"inline": false
				},
				{
					"name": "<:li_custom:754742002704187453> #custom-github",
					"value": "GitHub feed for [Little Improvements: Custom](https://github.com/LittleImprovementsCustom/LittleImprovementsCustom)",
					"inline": false
				},
				{
					"name": "<:grass_block:785928340539965460> #minecraft-news",
					"value": "News & Articles from the blog at [minecraft.net](https://www.minecraft.net/)",
					"inline": false
				}
			]
		}
		const pronounsEmbed = {
			"title": "🙋 Get Pronoun Roles",
			"description": "React to this message with the relevant emojis to get roles that tell others your pronouns.",
			"color": 16087843,
			"fields": [
				{
					"name": "🟧",
					"value": "she/her",
					"inline": true
				},
				{
					"name": "🟨",
					"value": "he/him",
					"inline": true
				},
				{
					"name": "🟥",
					"value": "they/them",
					"inline": true
				},
				{
					"name": "🟪",
					"value": "other",
					"inline": true
				}
			]
		}
        /*message.channel.send({ embed }).then(reactionMessage=>{
            reactionMessage.react("🟢");
            reactionMessage.react("🔴");
            reactionMessage.react("🔵");
            reactionMessage.react("🟠");
            reactionMessage.react("⚪");
            reactionMessage.react("🟣");
        })*/
		const getRolesChannel = message.guild.channels.cache.get("740838518116319322")
		// getRolesChannel.messages.fetch("741544749235830796")
		// 	.then(msg => {
		// 		msg.edit({ embed: notificationEmbed })
		// 			.then((msg1) => {
		// 				msg1.react("⚫");
		// 			})
		// 			.catch(console.error);
		// 	});
		getRolesChannel.messages.fetch("769631662291550318")
			.then(msg => {
				msg.edit({ embed:accessEmbed })
					.then((msg1) => {
						// msg1.react("774985841516740618")
					})
					.catch(console.error);
			});
		// getRolesChannel.messages.fetch("789241641092775957")
		// .then(msg => {
		// 	msg.edit({ embed:pronounsEmbed })
		// 		.then((msg1) => {
		// 			msg1.react("🟧")
		// 			msg1.react("🟨")
		// 			msg1.react("🟥")
		// 			msg1.react("🟪")
		// 			// msg1.react("774985841516740618")
		// 		})
		// 		.catch(console.error);
		// });
		// getRolesChannel.send({embed:pronounsEmbed}).then(reactionMessage=>{
		// 	reactionMessage.react("🟠")
		// 	reactionMessage.react("🟧")
		// 	reactionMessage.react("🔶")
		// })
	},
};