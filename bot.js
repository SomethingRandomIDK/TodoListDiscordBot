import 'dotenv/config'
import {Client, Events, GatewayIntentBits} from 'discord.js'

const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});
const tasks = []
const commandSymbol = '!';
const commands = {
    addTask: async function(msg) {
        const args = msg.content.split(' ');
        args.shift();
        let task = '';
        for (let x of args) {
            task += x + ' ';
            console.log(x);
        }
        tasks.push(task)
    },
    listTasks: async function (msg) {
        for (let x of tasks) {
            msg.channel.send(x);
        }
    }
};

client.once(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (msg) => {
    checkCommands(msg);
});

function checkCommands(msg) {
    if(!msg.author.bot && msg.content.startsWith(commandSymbol)) {
        if(commands[msg.content.split(' ')[0].slice(1)](msg));
    }
}

client.login(process.env.Token);

