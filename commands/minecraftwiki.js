const { prefix, color } = require('../config.json')
const request = require("request")
const fs = require("fs")

module.exports = {
    name: 'minecraftwiki',
    aliases: ["mcwiki","wiki", "w"],
    usage: "[query]",
    description: "Sends a link to a google search.",
    availableTo: "@everyone",
	execute(message, args) {
        
        if (args.length!=0) {
            request(`https://minecraft.gamepedia.com/Special:Search?fulltext=1&query=${encodeURIComponent(args.join(' '))}`, (searchError, searchResponse, searchBody) => {
                if (searchResponse.statusCode==200 && searchBody) {
                    const x = searchBody.split("unified-search__result__title")[0].split('"')
                    const pageURL = x[x.length-3]
                    if (pageURL) {
                        request(pageURL, (pageError, pageResponse, pageBody) => {
                            if (!pageResponse) message.channel.send({ embed: {
                                title: "Page Not Found",
                                description: `I couldn't find the Wiki page for your query. Try [searching yourself](https://minecraft.gamepedia.com/Special:Search) or [searching Google](https://www.google.com/search?q=${encodeURI(args.join(" "))}).`,
                                color: color
                            }})
                            else if (pageResponse.statusCode==200 && pageBody) {
                                message.channel.send({ embed: {
                                    title: pageBody.split("<title>")[1].split(" –")[0],
                                    description: `${pageBody.split('description" content="')[1].split('"')[0].split(" 1 ")[0].replace("&amp;quot;", '"').replace("&amp;amp;", "&").replace("&#039;", "'")} [More Info](${pageURL})`,
                                    thumbnail: {
                                        url: pageBody.split("infobox-imagearea")[1].split('src="')[1].split('"')[0]
                                    },
                                    author: {
                                        name: "Official Minecraft Wiki",
                                        icon_url: "https://gamepedia.cursecdn.com/minecraft_gamepedia/b/bc/Wiki.png",
                                        url: pageURL
                                    },
                                    color: color
                                }})
                            }
                        })
                    }
                }
            })
        }
        else message.channel.send(`You need to say what you want to search for! Usage: \`${prefix}${this.name} ${this.usage}\``)
            .catch(error => {
                message.reply('There was an error searching for that.')
            })
    },
}
