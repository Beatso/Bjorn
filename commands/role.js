module.exports = {
    name: 'role',
    cooldown: 0,
	execute(message, args) {
        const role = message.mentions.roles.first()
        if ( role==undefined ) {
            message.channel.send("You didn't mention a role!")
            return
        }
    },
};