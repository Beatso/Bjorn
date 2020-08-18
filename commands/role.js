module.exports = {
    name: 'role',
    cooldown: 0,
	execute(message, args) {
        const role = message.mentions.role.first();
        console.log(role);
    },
};