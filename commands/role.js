module.exports = {
    name: 'role',
    cooldown: 0,
	execute(message, args) {
        const role = message.mentions.roles.first()
        console.log(role);
    },
};