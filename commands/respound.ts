
import { Combine } from "../utility/combind"

const {SlashCommandBuilder, ChatInputCommandInteraction} = require("discord.js")


const combined = new Combine()

const command_hello = new SlashCommandBuilder()
                .setName("hello")
                .setDescription("Sayhi!")
const action_hello = async (interaction:typeof ChatInputCommandInteraction)  => {
    await interaction.reply(`hi <@${interaction.user.id}>`)
}

const command_meet= new SlashCommandBuilder()
                .setName("meet")
                .setDescription("Say Meet!")
const action_meet = async (interaction:typeof ChatInputCommandInteraction)  => {
    await interaction.reply(`meet <@${interaction.user.id}>`)
}





combined.add(command_meet,action_meet)
// combined.add(command_hello,action_hello) 

export default combined