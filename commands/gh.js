const { Octokit } = require("@octokit/core");
const githubtoken = require("../index.js").githubtoken
const octokit = new Octokit({ auth: githubtoken });



module.exports = {
    name: "gh",
    cooldown: 5,
	execute(message, args) {
		(async function () {

			let body = message.content.split("\n")
			body.splice(0,1)
			body = body.join("\n")
			body = body + `\n\n> This issue was created by an automation. It was authored in Discord by ${message.author.tag}, in ${message.guild.name} #${message.channel.name}.`

			let title = message.content.split("\n")[0].split(" ")
			title.splice(0,2)
			title = title.join(" ")

			try {
				const result = await octokit.request('POST /repos/{owner}/{repo}/issues', {
					owner: message.content.split("\n")[0].split(" ")[1].split("/")[0],
					repo: message.content.split("\n")[0].split(" ")[1].split("/")[1],
					title: title,
					body: body
				})
			message.channel.send(result.data.html_url)
			} catch (error) {}

		})()
	}
}