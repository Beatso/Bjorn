module.exports = {
    name: 'role',
    cooldown: 0,
	execute(message, args) {
        const role = message.mentions.roles.first()
        if ( role==undefined ) {
            message.channel.send("You didn't mention a role!")
            return
        }
        if ( args[0] = "add" ) {
            pass
        } else if ( args[0] = "remove" ) {
            pass
        } else {
            message.channel.send("Expected `add` or `remove`. Received `"+args[0]+"`")
        }
    },
};