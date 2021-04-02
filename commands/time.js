const weather = require('weather-js');

module.exports = {
	name: 'time',
	aliases: [ 'clock', 'worldclock', 'worldtime' ],
	execute(client, message, args, Discord, cmd) {
		var gmt = new Date().toLocaleString('en-US', { timeZone: 'Europe/London' });
		var est = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
		var pst = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
		var cst = new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' });
		var mst = new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' });
		var aest = new Date().toLocaleString('en-US', { timeZone: 'Australia/Sydney' });
		var awst = new Date().toLocaleString('en-US', { timeZone: 'Australia/Perth' });
		var kst = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
		var ist = new Date().toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });

		const worldClock = new Discord.MessageEmbed()
			.setAuthor('World Clock - Timezones')
			.addField(':flag_eu: London (GMT)', `${gmt}\n(GMT+0/GMT+1)`, true)
			.addField(':flag_us: New York (EST)', `${est}\n(GMT-5)`, true)
			.addField(':flag_us: Los Angles (PST)', `${pst}\n(GMT-8)`, true)
			.addField(':flag_us: Mexico City (CST)', `${cst}\n(GMT-7)`, true)
			.addField(':flag_au: Sydney (AEST)', `${aest}\n(GMT+11)`, true)
			.addField(':flag_au: Perth (AWST)', `${awst}\n(GMT+8)`, true)
			.addField(':flag_kr: Korean (KST)', `${kst}\n(GMT+9)`, true)
			.addField(':flag_in: India (IST)', `${ist}\n(GMT+05:30)`, true)
			.addField('\u200B', '\u200B', true)
			.setColor('#7289da');

		message.channel.send(worldClock);
	}
};
