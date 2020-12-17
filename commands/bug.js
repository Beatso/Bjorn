const {  color } = require('../config.json');

const JiraClient = require("jira-connector")
const jira = new JiraClient({host: "bugs.mojang.com"})

module.exports = {
    name: 'bug',
    cooldown: 5,
	execute(message, args) {
        (async function () {
            try {
                const issueKey = args[0].toUpperCase()
                const issue = await jira.issue.getIssue({issueKey:issueKey})
                let returnValue = {embed:{
                    author: {
                        name: issue.fields.reporter.name,
                        icon_url: issue.fields.reporter.avatarUrls["48x48"]
                    },
                    title: `[${issueKey}] ${issue.fields.summary}`,
                    url: `https://bugs.mojang.com/browse/${issueKey}`,
                    description: issue.fields.description,
                    fields: [
                        {
                            name: "Votes",
                            value: issue.fields.votes.votes,
                            inline: true
                        },
                        {
                            name: "Status",
                            value: issue.fields.status.name,
                            inline: true
                        },
                        {
                            name: "Attachments",
                            value: issue.fields.attachment.length,
                            inline: true
                        },
                        {
                            name: "Comments",
                            value: issue.fields.comment.total,
                            inline: true
                        },
                        {
                            name: "Watching",
                            value: issue.fields.watches.watchCount,
                            inline: true
                        }                
                    ],
                    footer: {
                        text: issue.fields.project.name,
                        icon_url: issue.fields.project.avatarUrls["48x48"]
                    },
                    color: 3066994
                }}
                if (issue.fields.status.name=="Resolved") {
                    returnValue.embed.fields.push({
                        name: "Resolution",
                        value: issue.fields.resolution.name,
                        inline: true
                    })
                    if (issue.fields.resolution.name=="Fixed") {
                        returnValue.embed.fields.push({
                            name: "Fixed",
                            value: issue.fields.fixVersions[0].name,
                            inline: true
                        })
                    }
                }
                message.channel.send(returnValue)
            } catch (error) {
                if (JSON.parse(error).statusCode==401) return (`I did not have permission to see the bug \`${issueKey}\`.`)
                else if (JSON.parse(error).statusCode==404) return (`The bug \`${issueKey}\` was not found.`)
                else {
                    console.error(error)
                    message.channel.send("There was an error trying to do that.")
                }
            }
        })()
    },
}