const request = require("request")
const { color } = require('../config.json')


module.exports = {
    name: "skin",
	description: "Gets the skin of a Minecraft username.",
	aliases: ["getskin", "mcskin"],
    usage: "[username]",
    availableTo: "@everyone",
	execute(message, args) {
		if (args[0] == undefined) message.channel.send("You need to specify a username!")
		request.post("https://api.mojang.com/profiles/minecraft", { json: true, body: args[0] }, (err, res, body) => {
			if (body.error) message.channel.send("There was an error trying to do that :c")
			else if (body[0] == undefined) message.channel.send(`Could not find a user with the name ${args[0]}.`)
			else {
				const skinEmbed = {
					"color": color,
					"author": {
						"name": body[0].name,
						"icon_url": `https://crafatar.com/avatars/${body[0].id}?overlay`
					},
					"thumbnail": {
						"url": `https://crafatar.com/skins/${body[0].id}`
					},
					"image": {
						"url": `https://crafatar.com/renders/body/${body[0].id}?overlay`
					},
					"footer": {
						"text": body[0].id
					}
				}
				message.channel.send({embed:skinEmbed})
			}
		})
    },
}
