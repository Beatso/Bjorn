const { MessageEmbed } = require('discord.js')
const moment = require('moment-timezone')
const { description } = require('./cem')

module.exports = {
	name: 'time',
	aliases: [ 'clock', 'worldclock', 'worldtime' ],
	execute(message, args) {

		const embed = new MessageEmbed()
			.setAuthor('World Clock - Timezones')
			.setColor('#7289da');

		let fields = [];
		
		[
			{ flag: 'eu', identifier: 'Europe/London' },
			{ flag: 'us', identifier: 'America/New_York' },
			{ flag: 'us', identifier: 'America/Los_Angeles' },
			{ flag: 'us', identifier: 'America/Chicago' },
			{ flag: 'au', identifier: 'Australia/Sydney' },
			{ flag: 'au', identifier: 'Australia/Perth' },
			{ flag: 'kr', identifier: 'Asia/Seoul' },
			{ flag: 'in', identifier: 'Asia/Calcutta' },
		].forEach(timezone => {
			const tz = moment.tz(timezone.identifier)
			const offset = (tz.utcOffset()/60).toString()
			fields.push({
				name: `:flag_${timezone.flag}: ${timezone.identifier.match(/\w+\/(\w+)$/)[1].replace('_', ' ')}`,
				value: `${tz.format('HH:mm DD/MM ')}\n${tz.zoneAbbr()} (UTC${offset < 0 ? offset : '+'+offset })`,
				inline: true,
				offset: offset
			})
		})

		embed.addFields(fields.sort((a, b) => (a.offset > b.offset) ? 1 : -1))
		// const gmt = new Date().toLocaleString('en-US', { timeZone: 'Europe/London' });
		// const est = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
		// const pst = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
		// const cst = new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' });
		// const mst = new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' });
		// const aest = new Date().toLocaleString('en-US', { timeZone: 'Australia/Sydney' });
		// const awst = new Date().toLocaleString('en-US', { timeZone: 'Australia/Perth' });
		// const kst = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
		// const ist = new Date().toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });


		// 	.addField(`:flag_eu: London (GMT)`, `${gmt}\n(GMT+0/GMT+1)`, true)
		// 	.addField(`:flag_us: New York (EST)`, `${est}\n(GMT-5)`, true)
		// 	.addField(`:flag_us: Los Angles (PST)`, `${pst}\n(GMT-8)`, true)
		// 	.addField(`:flag_us: Mexico City (CST)`, `${cst}\n(GMT-7)`, true)
		// 	.addField(`:flag_au: Sydney (AEST)`, `${aest}\n(GMT+11)`, true)
		// 	.addField(`:flag_au: Perth (AWST)`, `${awst}\n(GMT+8)`, true)
		// 	.addField(`:flag_kr: Korea (KST)`, `${kst}\n(GMT+9)`, true)
		// 	.addField(`:flag_in: India (IST)`, `${ist}\n(GMT+05:30)`, true)
		// 	.addField('\u200B', '\u200B', true)
			

		message.channel.send(embed);
	}
};
