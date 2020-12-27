const request = require("request")

module.exports = {
    name: "uuid",
	description: "Gets the UUID of a Minecraft username.",
	aliases: ["getuuid", "mcuuid"],
    usage: "[username]",
    availableTo: "@everyone",
	execute(message, args) {
		if (args[0] == undefined) message.channel.send("You need to specify a username!")
		request.post("https://api.mojang.com/profiles/minecraft", { json: true, body: args[0] }, (err, res, body) => {
			if (body.error) message.channel.send("There was an error trying to do that :c")
			else if (body[0] == undefined) message.channel.send(`Could not find a user with the name ${args[0]}.`)
			else message.channel.send(`The UUID of player ${body[0].name} is \`${body[0].id}\`.`)
		})
    },
}
