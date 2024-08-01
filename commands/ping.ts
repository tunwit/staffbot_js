import { Combine } from "../utility/combind"

const {SlashCommandBuilder, ChatInputCommandInteraction} = require("discord.js")

console.log(1);

const combind = new Combine()
const command = new SlashCommandBuilder()
                .setName("ping")
                .setDescription("Reply with ping!")

const action_ping = async (interaction:typeof ChatInputCommandInteraction) => {
    await interaction.reply(`Pong ! ${interaction.client.ws.ping}`)
}

combind.add(command,action_ping)

console.log(2);

export default combind