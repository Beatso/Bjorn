const config = require('@config');
const sendError = require('@functions/sendError');
const fetch = require('node-fetch');
function validateUUID(input) {
	var uuidRegex = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|[0-9a-f]{8}[0-9a-f]{4}[1-5][0-9a-f]{3}[89ab][0-9a-f]{3}[0-9a-f]{12})$/i;
	return typeof input === 'string' && uuidRegex.test(input);
}

module.exports = {
	name: 'mcuser',
	description: 'Gets information about a minecraft user',
	usage: `mcuser <username>`,
	aliaes: [ 'mcaccount' ],
	async execute(client, message, args, Discord, cmd) {
		if (!args[0]) return sendError(message, `You must specify a username.`, 'Invalid Syntax');
		var name;
		var uuid;
		if (validateUUID(args[0])) {
			uuid = args[0];
			await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
				.then((res) => res.json())
				.then(async (json) => {
					name = json.name;
				});
		} else {
			name = args[0];
			await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`)
				.then((res) => res.json())
				.then(async (json) => {
					uuid = json.id;
				});
		}

		r = await fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)
			.then((response) => response.json())
			.then((json) => {
				return json;
			});

		var names = [];
		// if(r.error) return sendError
		r.forEach((n) => {
			names.push(n.name.replace(/_/g, '\\_'));
		});
		names.pop();

		var mojangCape;
		var cape;

		// await fetch(`http://s.optifine.net/capes/${name}.png`).then((res) => {
		//  	return res.ok ? true : false;
		// }); // not cape server
		const optifineCape = await fetch(`http://107.182.233.85/capes/${name}.png`).then((res) => {
			return res.ok ? true : false;
		}); // cape server

		var skinTexture = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
			.then((res) => res.json())
			.then((json) => {
				decoded = JSON.parse(new Buffer.from(json.properties[0].value, 'base64').toString('ascii'));
				skin = decoded.textures.SKIN.url;
				mojangCape = decoded.textures.CAPE ? true : false;
				return skin;
			});

		if (mojangCape && !optifineCape) cape = 'Minecraft Cape';
		if (optifineCape && !mojangCape) cape = '[OptiFine](https://optifine.net) Cape';
		if (mojangCape && optifineCape) cape = 'Minecraft and [OptiFine](https://optifine.net) Cape';
		if (!mojangCape && !optifineCape) cape = 'None';

		var embed = new Discord.MessageEmbed()
			.setColor(config.colors.defualt)
			.setURL(`https://mine.ly/${name}`)
			.setTitle(name)
			.setImage(`https://minecraftSkinAPI.xlchannel6.repl.co/${name}?${Math.random() * 23}`)
			.setAuthor(String.fromCharCode(8203), `https://crafatar.com/avatars/${uuid}?overlay`)
			.setThumbnail(skinTexture);

		names.length > 1
			? embed.addField('Past Usernames', names.join(', '), true)
			: 'ZG0gQ2hyb211cyM0NzYxIG9uIGRpc2NvcmQgaWYgeW91IHNlZSB0aGlz';
		embed.addField(`UUID`, uuid, true);
		embed.addField('Cape', cape, true);
		message.channel.send(embed);
	}
};
