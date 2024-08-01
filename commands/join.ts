import { getVoiceConnection, joinVoiceChannel } from "@discordjs/voice"
import { Combine } from "../utility/combind"
import { type GuildMember, SlashCommandBuilder, type GuildTextBasedChannel, type TextBasedChannel } from "discord.js"
import { ChatInputCommandInteraction } from "discord.js"
import Receiver from "../utility/receiver"

let join = false

const combind = new Combine()

const command_join = new SlashCommandBuilder()
                .setName("join")
                .setDescription("join voice channel!")

const action_join = async (interaction: ChatInputCommandInteraction) => {
    if (interaction.channel && interaction.guild && interaction.member){
        let connection = getVoiceConnection(interaction.guild.id)
        if (connection){
            connection.destroy()
        }
        const member = interaction.member as GuildMember
        console.log(member.voice.channel);
        
        if (member.voice.channel){
            connection = joinVoiceChannel({
                channelId: member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            await interaction.reply({content:`Join!`,ephemeral:true})
            const receiver = new Receiver(connection.receiver).listen(interaction.user.id)
        }else{
            await interaction.reply({content:`You are not in vc`,ephemeral:true})
        }
    }
}

const command_leave = new SlashCommandBuilder()
                .setName("leave")
                .setDescription("leave voice channel")

const action_leave = async (interaction: ChatInputCommandInteraction) => {
    if (interaction.channel && interaction.guild){
        const connection = getVoiceConnection(interaction.guild.id);
        if (connection){
            connection.destroy()
            interaction.reply({content:"Leave!",ephemeral:true})
        }else{
            interaction.reply({content:"Bot is not in vc",ephemeral:true})
        }
        
    }
}

combind.add(command_join,action_join)
combind.add(command_leave,action_leave)

export default combind