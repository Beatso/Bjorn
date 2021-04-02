module.exports = {
	name: 'coinflip',
	description: 'Flips a coin',
	aliases: [ 'flip', 'coin', 'flipcoin' ],
	execute(message, args) {
		Math.floor(Math.random() * 2) === 1
			? message.channel.send('It was heads.')
			: message.channel.send('It was tails.');
	}
};
