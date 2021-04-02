module.exports = {
	name: 'coinflip',
	description: 'Flips a coin',
	usage: `coinflip`,
	aliases: [ 'flip', 'coin', 'flipcoin' ],
	execute(client, message, args, Discord, cmd) {
		Math.floor(Math.random() * 2) === 1
			? message.channel.send('It was heads.')
			: message.channel.send('It was tails.');
	}
};
