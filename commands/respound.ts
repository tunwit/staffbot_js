import type {  ChatInputCommandInteraction } from "discord.js";
const { SlashCommandBuilder } = require("discord.js");
const command = new SlashCommandBuilder()
                .setName("hello")
                .setDescription("Sayhi!")

module.exports={
    data:command,
    async execute (interaction:ChatInputCommandInteraction) {
        await interaction.reply(`hi <@${interaction.user.id}>`)
    }
}