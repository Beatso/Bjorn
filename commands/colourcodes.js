const { prefix, footers } = require('../config.json');

module.exports = {
    name: 'colourcodes',
    description: 'get mc colour codes',
    usage: `${prefix}colourcodes`,
    type: "peasant",
    cooldown: 15,
	execute(message, args) {
        colourcodes=":red_circle: **Red** ``§c``\n\
:yellow_circle: Yellow ``§e``\n\
:green_circle: Green ``§a``\n\
:blue_circle: Aqua ``§b``\n\
:blue_circle: Blue ``§9``\n\
:purple_circle: Light Purple ``§d``\n\
:white_circle: White ``§f``\n\
:black_circle: Gray ``§7``\n\
:red_circle: Dark Red ``§4``\n\
:yellow_circle: Gold ``§6``\n\
:green_circle: Dark Green ``§2``\n\
:blue_circle: Dark Aqua ``§3``\n\
:blue_circle: Dark Blue ``§1``\n\
:black_circle: Dark Purple ``§5``\n\
:black_circle: Dark Gray ``§8``\n\
:black_circle: Black** ``§0``\n\
:regional_indicator_b: **Bold** ``§l``\n\
:regional_indicator_s: ~~Strikethrough~~ ``§m``\n\
:regional_indicator_u: __Underline__ ``§n``\n\
:regional_indicator_i: *Italic* ``§o``\n\
:regional_indicator_o: ||Obfuscated|| ``§k``\n\
:regional_indicator_r: Reset ``§r``\n\n\
also available [here](https://minecraft.tools/en/color-code.php)"
    const colourEmbed = {
        "title": "MC Colour Codes",
        "description": colourcodes,
        "color": 16087843,
        "footer": { "text": footers[Math.floor(Math.random()*footers.length)] }
    };
    message.channel.send({embed: colourEmbed})
    },
};