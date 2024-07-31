import type { ChatInputCommandInteraction } from "discord.js";

const { SlashCommandBuilder } = require("discord.js");

const command = new SlashCommandBuilder()
                .setName("ping")
                .setDescription("Reply with ping!")

module.exports={
    data:command,
    async execute (interaction:ChatInputCommandInteraction) {
        await interaction.reply(`Pong ! ${interaction.client.ws.ping}`)
    }
}