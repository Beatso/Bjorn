// https://anidiots.guide/examples/making-an-eval-command

const clean = text => {
	if (typeof(text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
	else
		return text
}

module.exports = {
	name: 'eval',
	description: 'Runs direct JS code.',
	availableTo: "<@634776327299399721>",
	aliases: [],
	execute(message, args) {

		if (message.author.id !== '634776327299399721') return message.channel.send('You don\'t have permission to do that!')

		try {

			const code = args.join(" ")
			let evaled = eval(code)

			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled)

			message.channel.send(clean(evaled), {code:"xl"})

		} catch (err) {

			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
			
		}
	},
}
