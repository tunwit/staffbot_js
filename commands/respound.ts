

import { Combine } from "../utility/combind"
import {SlashCommandBuilder, ChatInputCommandInteraction, SlashCommandStringOption} from "discord.js"


const combined = new Combine()

const command_hello = new SlashCommandBuilder()
                .setName("hello")
                .setDescription("Sayhi!")
                .addStringOption(option => 
                    option.setName("message")
                    .setDescription("message to display")
                    .setRequired(true)
                    )
                
const action_hello = async (interaction:ChatInputCommandInteraction)  => {
    const message = interaction.options.getString("message");
    
    await interaction.reply(`hi <@${interaction.user.id}> you said ${message}`)
}

const command_meet= new SlashCommandBuilder()
                .setName("meet")
                .setDescription("Say Meet!")
const action_meet = async (interaction: ChatInputCommandInteraction)  => {
    await interaction.reply(`meet <@${interaction.user.id}>`)
}

combined.add(command_meet,action_meet)
combined.add(command_hello,action_hello) 

export default combined