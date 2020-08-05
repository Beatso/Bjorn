//const { footers } = require('../config.json');
const { prefix } = require('../config.json');


module.exports = {
    name: 'rules',
    description: 'refer to a particular rule',
    usage: `${prefix}rules [keyword]`,
    type: "peasant",
    cooldown: 5,
	execute(message, args) {
        faqtitle = "";
        faqanswer = "";
        if (!args.length) {
            faqtitle = "Rules"
            faqanswer = "For a list of all the rules, see <#738130312361672726>."
        }
        switch (args[0]) {
            case "list":
                faqtitle = "FAQs"
                faqanswer = "A list of all the faq keywords: `list`,`rules`,`ip`,`emoji`."
                break;
            case "rules":
                faqtitle = "Rules"
                faqanswer = "[Link to rules document](https://docs.google.com/document/d/1mIcXKlIpBDzuFwqy2dArn4wkKarMMGDHfB1lO2y_vlI/edit)"
                break;
            case "ip":
                faqtitle = "Server IP"
                faqanswer = "95.168.186.86:44863"
                break;
            case "emoji":
                faqtitle = "Suggest an emoji"
                faqanswer = "If you want to suggest an emoji for Beatso to add to the server, you should send a link to **a direct download link** to Beatso. The image should be of reliatively high quality and should have a transparent background."
            case "pastebin":
                title = "Pastebins",
                description = "If you're posting a long message (maybe some deep stuff, or anything else) use one of these sites to avoid cluttering the text channel:\n• [Pastebin](https://pastebin.com/) (recommended)\n• [nomsy](https://paste.nomsy.net/)\n• [hasteb.in](https://hasteb.in/)\n• [sourceb.in](https://sourceb.in/)\n• [hastebin](https://hastebin.com/)"
        
        }
        const faqEmbed = {
            "title": faqtitle,
            "description": faqanswer,
            "color": 16087843,
            "footer": {
              //"text": footers[Math.floor(Math.random()*footers.length)]
            }
        };
        message.channel.bulkDelete(1);
        message.channel.send({embed:faqEmbed})
    },
};