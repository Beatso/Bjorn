module.exports = {
    name: 'role',
    cooldown: 0,
	execute(message, args) {

        // check if the user is a moderator. if not, exit.
        if (!(member.roles.cache.some(role => role.name === 'Moderator'))) {
            message.channel.send("Insufficient permissions.")
            return
        }
        
        // check if the user mentioned a role in the command. if not, exit.
        const role = message.mentions.roles.first()
        if ( role==undefined ) {
            message.channel.send("You didn't mention a role!")
            return
        }

        // work out if the user wanted to add or remove a role. act accordingly.
        if ( args[0] == "add" ) {
            return
        } else if ( args[0] == "remove" ) {
            return
        } else {
            message.channel.send("Expected `add` or `remove`. Received `"+args[0]+"`")
        }
    },
};