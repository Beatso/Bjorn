// const { Octokit } = require("@octokit/core");
// const { githubtoken, beatsoghtoken } = require("../index.js")
// const octokit_bjorn = new Octokit({ auth: githubtoken });
// const octokit_beatso = new Octokit({ auth: beatsoghtoken });



// module.exports = {
// 	name: "githubissue",
// 	aliases: ["ghissue", "github", "gh"],
// 	description: "Opens an issue on GitHub.",
// 	usage: "[repo] [issue title]\n<issue body>\n<options>",
// 	parameters: "**Repo**: In the format `owner/reponame`. If no owner is specified, it will default to `Beatso`. The shortcuts `lic` and `liv` can also be used.\n**Issue Title**: The title of the issue to open.\n**Issue Body**: *optional* The description of the issue. Supports full [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).\n**Options**: *optional* Only works for <@634776327299399721> `; assign [assignee]; label [labels, separated by commas]`",
// 	availableTo: "@everyone",
// 	execute(message, args) {
// 		(async function () {

// 			let body = message.content.split("\n")
// 			body.splice(0,1)
// 			hasArgs = false
// 			if(body.length!=0) {
// 				if (body[body.length-1].startsWith("; ")) {
// 					hasArgs = true
// 					issueArgs = body[body.length-1]
// 					body.splice(body.length-1, body.length)
// 				}
// 			}
// 			body = body.join("\n")
// 			body = body.concat(`\n\n> This issue was created by an automation. It was authored in Discord by ${message.author.tag}, in ${message.guild.name} #${message.channel.name}.`)

// 			let title = message.content.split("\n")[0].split(" ")
// 			title.splice(0,2)
// 			title = title.join(" ")

// 			const specifiedownerrepo = message.content.split("\n")[0].split(" ")[1]
			
// 			assignee = null
// 			labels = []
// 			if (hasArgs) for (i of issueArgs.split("; ")) {
// 				if (i.startsWith("assign ")) {
// 					assignee = i.split(" ")[1]
// 				} else if (i.startsWith("label ")) {
// 					labels = i.substring(6).split(", ")
// 				}
// 			}

// 			if (specifiedownerrepo=="lic") {
// 				owner = "LittleImprovementsCustom"
// 				repo = "LittleImprovementsCustom"
// 			} else if (specifiedownerrepo=="liv") {
// 				owner = "Beatso"
// 				repo = "LittleImprovementsVariated"
// 			} else if (!specifiedownerrepo.includes("/")) {
// 				owner = "Beatso"
// 				repo = specifiedownerrepo.split("/")[0]
// 			} else {
// 				owner = specifiedownerrepo.split("/")[0]
// 				repo = specifiedownerrepo.split("/")[1]
// 			}

// 			const issueRequestArgs = {
// 				owner: owner,
// 				repo: repo,
// 				title: title,
// 				body: body,
// 				assignee: assignee,
// 				labels: labels
// 			}

// 			console.log(issueRequestArgs)

// 			try {
// 				if (message.author.id=="634776327299399721") result = await octokit_beatso.request('POST /repos/{owner}/{repo}/issues', issueRequestArgs)
// 				else result = await octokit_bjorn.request('POST /repos/{owner}/{repo}/issues', issueRequestArgs)
// 			message.channel.send(`<${result.data.html_url}>`)
// 			} catch (error) {message.channel.send("something when wrong creating that issue :c")}

// 		})()
// 	}
// }
