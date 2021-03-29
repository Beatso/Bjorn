const axios = require('axios')
const { color } = require('../config.json')

const randElement = array => array[Math.floor((Math.random()*array.length))]
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const suffixes = ["", "k", "m", "b","t"]
const readableNumber = value => {
    const suffixNum = Math.floor((""+value).length/3)
    let shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2))
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1)
    return shortValue+suffixes[suffixNum]
}

module.exports = {
	name: 'meme',
	description: "Gets a random meme from reddit.",
	availableTo: "@everyone", // moderator role id
	aliases: ["dankmeme"],
	async execute (message, args) {
		
		try {

			const post = (await axios.get(`https://api.reddit.com/r/${randElement(['memes', 'dankmemes'])}/${randElement(['hot', 'rising'])}?limit=50`)).data.data.children[randInt(0,24)].data

			if (post.over_18 && !message.channel.nsfw) return message.channel.send('Could not send meme since it was NSFW.')
	
			message.channel.send({ embed: {
				title: post.title,
				url: `https://redd.it/${post.id}`,
				image: { url: post.url },
				footer: {
					text: `${readableNumber(post.ups)} points on r/${post.subreddit}`,
					icon_url: (await axios.get(`https://api.reddit.com/r/${post.subreddit}/about`)).data.data.icon_img
				},
				color: color
			}})

		} catch (err) {
			console.error(err)
			return message.channel.send('There was an error trying to send a meme.')
		}

	}
};
