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
                "value": "[Little Improvements: Variated](https://www.planetminecraft.com/texture-pack/little-improvements-variated/)",
                "inline": true
              },
              {
                "name": ":red_circle:",
                "value": "[Better Redstone Components](https://www.planetminecraft.com/texture-pack/better-redstone-components/)",
                "inline": true
              },
              {
                "name": ":blue_circle:",
                "value": "[Connected Texture Packs](https://www.planetminecraft.com/texture-pack/connected-smooth-stone-no-optifine/)",
                "inline": true
              },
              {
                "name": ":orange_circle:",
                "value": "[New Resource Packs](https://www.planetminecraft.com/member/beatso/submissions/texture-packs/)",
                "inline": true
              },
              {
                "name": ":white_circle:",
                "value": "[Resource Pack Info](https://www.beatso.tk/resource-pack-info)",
                "inline": true
              },
              {
                "name": ":purple_circle:",
                "value": "[Crafting Datapacks](https://www.planetminecraft.com/collection/69976/beatso-s-qol-crafting-packs/)",
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