module.exports = {
	name: 'base64',
	description: 'Encodes and Decodes base64',
	usage: `base64 <encode/decode> <text>`,
	execute(client, message, args, Discord, cmd) {
		// if (!args[0]) return message.reply('You must specify encoding or decoding.');
		if (!(args[0] == 'encode' || args[0] == 'decode'))
			return message.reply('You must specify encoding or decoding.');
		if (!args[1]) return message.reply(`You must specify text to ${args[0]}.`);

		var text = args.join(' ').substring(args[0].length + 1);

		function encode(text) {
			let buff = new Buffer.from(text);
			let base64data = buff.toString('base64');
			let res = {
				originalData: text,
				buff: buff,
				base64: base64data
			};
			return res;
		}
		function decode(text) {
			let buff = new Buffer.from(text, 'base64');
			let base64data = buff.toString('ascii');
			let res = {
				originalData: text,
				buff: buff,
				base64: base64data
			};
			return res;
		}

		try {
			if (args[0] == 'encode') {
				let res = encode(text);
				message.channel.send(res.base64);
			} else {
				let res = decode(text);
				message.channel.send(res.base64);
			}
		} catch (err) {
			message.reply(`There was an error ${args[0].substring(0, args[0].length - 1)}ing that.`);
			console.log(err);
		}
	}
};
