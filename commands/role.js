module.exports = {
    name: 'role',
    cooldown: 0,
	execute(message, args) {
        if (message.mentions.roles.count()==0) {
            message.channel.send("You didn't mention a role!")
        } else {
            const role = message.mentions.roles.first()
            message.channel.send(role)
        }
    },
};