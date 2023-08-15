const Discord = require('discord.js');

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: intents, partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS" ]});

require('dotenv').config()

client.once('ready', async () => {
    console.log('Bot is ready');
});

client.on('messageCreate', (message) => {
    let flag;
    if (message.content.toLowerCase() == '!emute') {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;
        flag = !(message.member.voice.serverMute);
        let channel = message.member.voice.channel;
        channel.members.forEach(member => {
            member.voice.setMute(flag);
        });
    }
});

client.login(process.env.token);