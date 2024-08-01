import {Client, Events, GatewayIntentBits} from "discord.js"
import type { Interaction, SlashCommandBuilder } from "discord.js";
import path from "node:path"
import { load,commandInstance } from "./handler/register_command";


const bot = new Client({intents: [
    "Guilds",
    "GuildMembers",
    "GuildMessages",
    "GuildVoiceStates",
    "GuildWebhooks",
    "DirectMessages",
    "MessageContent",
]})

bot.once("ready",async (e:typeof bot)=>{
    await load(bot)
    console.log('====================================');
    console.log(e.user?.username + "is ready");
    console.log('====================================');})
    
    
bot.on(Events.InteractionCreate,async (interaction:Interaction) =>{
    if (interaction.isChatInputCommand()){
        let command = commandInstance.filter(command=>command.command.name==interaction.commandName)
        await command[0].action(interaction);
    }
})

bot.login(process.env.DISCORD_TOKEN)