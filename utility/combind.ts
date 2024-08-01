import type { SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from "discord.js";

type CommandObj = {
    command:SlashCommandBuilder|SlashCommandOptionsOnlyBuilder,
    action:CallableFunction
}
class Combine { 
    commands:CommandObj[] = []
    add(command:SlashCommandBuilder|SlashCommandOptionsOnlyBuilder,action:CallableFunction){
        this.commands.push({
            command:command,
            action:action
        })
    }
}
export {Combine,type CommandObj}