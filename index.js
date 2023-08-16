const {Client, Events, GatewayIntentBits} = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });

require('dotenv').config()

client.once('ready', async () => {
    console.log('Bot is ready');
});

client.on(Events.MessageCreate, (message) => {
    if (message.content.toLowerCase() == '!emute') {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        try {

            const flag = !(message.member.voice.serverMute);

            const members = message.member.voice.channel.members;
            
            members.forEach(member => member.voice.setMute(flag));
        } catch (DiscordAPIError) {
            message.reply('You\'re not connected to a voice channel.').then(msg => {
                setTimeout(() => msg.delete(), 5000)
            });
        }        

    }
});

client.login(process.env.token);