const Discord = require('discord.js');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fetch = require('node-fetch')
module.exports.Gbot = client;

const HypixelAPIReborn = require('hypixel-api-reborn');
const { prefix, intervals, token, maxtracks } = require('./assets/config.json'); // Imports the tokens and the prefix from the config file.

client.commands = new Discord.Collection()
const fs = require('fs');
const wsPlayers = fs.readFileSync("./wsLogPlayers.txt").toString().split("\n")
console.log(wsPlayers)
const logPlayers = fs.readFileSync("./logPlayers.txt").toString().split("\n")
console.log(logPlayers)
const whitelist = fs.readFileSync("./whitelist.txt").toString().split("\n")
const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const functions = require('./assets/trackers.js');
const { get } = require('http');

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: 'made by 4v4 .gg/tpA98BdghS' } });
	require('http').createServer((req, res) => res.end('Bot is alive!')).listen(3000)
	/*for(let i = 0; i < logPlayers.length; i++) {
		functions.logPlayer(logPlayers[i])
	}*/
		const rawTracks = fs.readFileSync("./trackPlayers.txt").toString().split("\n")
		var trackPlayers = [], trackGuilds = []
		for(let i = 0; i < rawTracks.length; i++) {
			trackPlayers.push(rawTracks[i].split(":")[0])
			trackGuilds.push(rawTracks[i].split(":")[1])
		}
		const rawStats = fs.readFileSync("./statsPlayers.txt").toString().split("\n")
		var statsPlayers = [], statsGuilds = []
		for(let i = 0; i < rawStats.length; i++) {
			statsPlayers.push(rawStats[i].split(":")[0])
			statsGuilds.push(rawStats[i].split(":")[1])
		}
		console.log(statsPlayers)
		console.log(statsGuilds)
		console.log(trackPlayers)
		console.log(trackGuilds)
		for(let i = 0; i < trackPlayers.length; i++) {
			functions.trackPlayer(trackGuilds[i], trackPlayers[i])
		}
		for(let i = 0; i < statsPlayers.length; i++) {
			functions.statsTrack(statsGuilds[i], statsPlayers[i])
		}
});

client.on('message', message => {
	if(message.author.bot || message.channel.type == "dm" || !message.content.startsWith("-")) return;
	const args = message.content.split(" ")
	const command = args[0].slice(1)
	if(!commands.includes(command + '.js')) return;

	const commandObject = require('./commands/' + command + '.js')

	commandObject.execute(message, args)
	console.log(message.author.tag + " Said:" + message.content)
});

client.login(token);