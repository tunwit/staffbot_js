import { Combine } from "../utility/combind"
import { SlashCommandBuilder } from "discord.js"
import { ChatInputCommandInteraction } from "discord.js"

const combind = new Combine()
const command = new SlashCommandBuilder()
                .setName("ping")
                .setDescription("Reply with ping!")

const action_ping = async (interaction:ChatInputCommandInteraction) => {
    await interaction.reply(`Pong ! ${interaction.client.ws.ping}`)
}

combind.add(command,action_ping)

export default combind