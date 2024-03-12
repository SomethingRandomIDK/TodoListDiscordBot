import 'dotenv/config'
import {Client, Events, GatewayIntentBits} from 'discord.js'

const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});
const commandSymbol = '!';

client.once(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (msg) => {
    checkCommands(msg);
});

function checkCommands(msg) {
    if(!msg.author.bot && msg.content.startsWith(commandSymbol)) {
        msg.reply('This is a command!');
    }
}

client.login(process.env.Token);

