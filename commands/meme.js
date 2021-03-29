const axios = require('axios')

randElement = array => array[Math.floor((Math.random()*array.length))]

module.exports = {
	name: 'meme',
	description: "Gets a random meme from reddit.",
	availableTo: "@everyone", // moderator role id
	aliases: ["dankmeme"],
	async execute (message, args) {
		
		try {

			const post = (await axios.get(`https://api.reddit.com/r/${randElement(['memes', 'dankmemes'])}/${randElement(['hot', 'rising'])}?limit=1`)).data.data.children[0].data

			if (post.over_18 && !message.channel.nsfw) return message.channel.send('Could not send meme since it was NSFW.')
	
			message.channel.send({ embed: {
				title: post.title,
				url: `https://redd.it/${post.id}`,
				image: { url: post.url },
				footer: {
					text: `${post.ups} points on r/${post.subreddit}`,
					icon_url: (await axios.get(`https://api.reddit.com/r/${post.subreddit}/about`)).data.data.icon_img
				}
			}})

		} catch {
			return message.channel.send('There was an error trying to send a meme.')
		}

	}
};
