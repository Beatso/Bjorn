const redditImageFetcher = require('reddit-image-fetcher')
const fetch = require('node-fetch')

module.exports = {
	name: 'meme',
	description: "Gets a random meme from reddit.",
	availableTo: "@everyone", // moderator role id
	aliases: ["dankmeme"],
	async execute (message, args) {

		const meme = (await redditImageFetcher.fetch({
			type: 'custom',
			subreddit: ['memes', 'dankmemes']
		}))[0]

		if (meme.NSFW && !message.channel.nsfw) return message.channel.send('Could not send meme since it was NSFW.')

		message.channel.send({ embed: {
			title: meme.title,
			url: meme.postLink,
			image: { url: meme.image },
			footer: {
				text: `${meme.upvotes} points on r/${meme.subreddit}`,
				icon_url: (await((await fetch(`https://api.reddit.com/r/${meme.subreddit}/about`)).json())).data.icon_img
			}
		}})

	}
};
