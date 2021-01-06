const canvas = require("canvas")
const Discord = require("discord.js")

module.exports = {
	name: 'caption',
	description: "Checks the bot is online and gets its latency and uptime.",
	availableTo: "@everyone",
	aliases: ["subtitle", "addtext"],
	execute(message, args) {

		const userRegex = /<@!?(\d{18})>|(\d{18})/

		message.channel.send("Working on it...")
			.then(async loadingMessage => {

				if (message.attachments.first()) imageURL = message.attachments.first().url
				else if (message.reference && message.referencedMessage.attachments.first()) imageURL = message.referencedMessage.attachments.first().url
				else if (userRegex.test(args[0]) && userRegex.exec(args[0])[1]) imageURL = message.guild.members.cache.get(userRegex.exec(args[0])[1]).user.avatarURL({ format: "png"})
				else imageURL = message.author.avatarURL({ format: "png"})
		
				const imageData = await canvas.loadImage(imageURL)
				const imageCanvas = canvas.createCanvas(imageData.width, imageData.height)
				const ctx = imageCanvas.getContext("2d")
				ctx.drawImage(imageData, 0, 0)

				const caption = "Hello world!"
				ctx.strokeStyle = "black"
				ctx.fillStyle = "yellow"
				ctx.lineWidth = 0.3
				ctx.font = "15px Arial"
				ctx.textAlign = "center"
				ctx.measureText(caption)
				ctx.fillText(caption, imageCanvas.width/2, imageCanvas.height-3)
				ctx.strokeText(caption, imageCanvas.width/2, imageCanvas.height-3)
		
				// send response
				loadingMessage.delete()
				const outputBuffer = imageCanvas.toBuffer()
				if (Buffer.byteLength(outputBuffer) <= 8000000) {
					message.channel.send(new Discord.MessageAttachment(outputBuffer, "output.png"))
						.catch(error => message.channel.send((`Sending the response image failed for the following reason:\n\`${error}\``)))
				} else {
					message.channel.send(("Could not send the response image because the file size was too big."))
				}

			})
	},
}
