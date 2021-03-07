module.exports.parseMember = (input, guild) => {

	if (typeof input != 'string' && input) input = String(input)

	if (!input) return { success: false, reason: 'not_provided' }

	const regex = /(\d{18})|<@?(\d{18})>/.exec(input)

	input = input.toLowerCase()

	// id
	if (regex && guild.members.cache.has(regex[0]))
		return { success: true, type: 'id', member: guild.members.cache.get(regex[0]) }

	// name
	else if (guild.members.cache.some(member => member.user.username.toLowerCase() == input))
		return { success: true, type: 'name', member: guild.members.cache.find(member => member.user.username.toLowerCase() == input) }	

	// nick
	else if (guild.members.cache.some(member => member.nickname && member.nickname.toLowerCase() == input))
		return { success: true, type: 'nick', member: guild.members.cache.find(member => member.nickname && member.nickname.toLowerCase() == input) }

	// not found
	else return { success: false, reason: 'not_found' }

}
