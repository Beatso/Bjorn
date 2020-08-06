const { prefix } = require('../config.json');

module.exports = {
    name: 'reactionrole',
    cooldown: 0,
	execute(message, args) {
        const embed = {
            "title": "Get Notification Roles",
            "description": "React to this message with the relevant emojis to be notified for updates to certain packs:",
            "color": 16087843,
            "fields": [
              {
                "name": ":green_circle:",
                "value": "Little Improvements: Variated",
                "inline": true
              },
              {
                "name": ":red_circle:",
                "value": "Better Redstone Components",
                "inline": true
              },
              {
                "name": ":blue_circle:",
                "value": "Connected Texture Packs",
                "inline": true
              },
              {
                "name": ":orange_circle:",
                "value": "New Resource Packs",
                "inline": true
              },
              {
                "name": ":white_circle:",
                "value": "Resource Pack Info",
                "inline": true
              },
              {
                "name": ":purple_circle:",
                "value": "Crafting Datapacks",
                "inline": true
              }
            ]
        }
        message.channel.send({ embed }).then(reactionMessage=>{
            reactionMessage.react("🟢");
            reactionMessage.react("🔴");
            reactionMessage.react("🔵");
            reactionMessage.react("🟠");
            reactionMessage.react("⚪");
            reactionMessage.react("🟣");
        })
    },
};