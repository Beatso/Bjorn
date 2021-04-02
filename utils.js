module.exports.parseMember = (input, guild) => {

	if (typeof input != 'string' && input) input = String(input)

	if (!input) return { success: false, reason: 'not_provided' }

	const regex = /(\d{18})|<@!?(\d{18})>/.exec(input)

	input = input.toLowerCase()

	const idMember =  regex ? guild.members.cache.get(regex[1] ? regex[1] : regex[2]) : null
	const nameMember = guild.members.cache.find(member => member.user.username.toLowerCase() == input)
	const nickMember = guild.members.cache.find(member => member.nickname && member.nickname.toLowerCase() == input)

	// id
	if (regex && idMember)
		return { success: true, type: 'id', member: idMember }

	// name
	else if (nameMember)
		return { success: true, type: 'name', member: nameMember }	

	// nick
	else if (nickMember)
		return { success: true, type: 'nick', member: nickMember }

	// not found
	else
		return { success: false, reason: 'not_found' }

}

module.exports.parseTextChannel = (input, guild) => {

	if (typeof input != 'string' && input) input = String(input)

	if (!input) return { success: false, reason: 'not_provided' }

	const regex = /(\d{18})|<#(\d{18})>/.exec(input)

	input = input.toLowerCase()

	const channelCache = guild.channels.cache.filter(channel.type == 'text' || channel.type == 'news')
	const idChannel = regex ? channelCache.get(regex[1] ? regex[1] : regex[2]) : null
	const nameChannel = channelCache.find(channel => channel.name.toLowerCase() == input)

	// id
	if (regex && idChannel)
		return { success: true, type: 'id', channel: idChannel }

	// name
	else if (nameChannel)
		return { success: true, type: 'name', channel: nameChannel }

	// not found
	else
		return { success: false, reason: 'not_found' }

}

module.exports.parseRole = (input, guild) => {

	if (typeof input != 'string' && input) input = String(input)

	if (!input) return { success: false, reason: 'not_provided' }

	const regex = /(\d{18})|<@&(\d{18})>/.exec(input)

	input = input.toLowerCase()

	const idRole = regex ? guild.roles.cache.get(regex[1] ? regex[1] : regex[2]) : null
	const nameRole = guild.roles.cache.find(role => role.name.toLowerCase() == input)

	// id
	if (regex && idRole)
		return { success: true, type: 'id', role: idRole }

	// name
	else if (nameRole)
		return { success: true, type: 'name', role: nameRole }

	// not found
	else
		return { success: false, reason: 'not_found' }

}
