const Discord = require('discord.js');

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: intents, partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS" ]});

require('dotenv').config()

client.once('ready', async () => {
    console.log('Bot is ready');
});

client.on('messageCreate', (message) => {
    if (message.content.toLowerCase() == '!emute') {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;
            let channel = message.member.voice.channel;
            for (let member of channel.members) {
                if (member[1].voice.serverMute) {
                    member[1].voice.setMute(false);
                } else {
                    member[1].voice.setMute();
                }
            }
        }
});

client.login(process.env.token);