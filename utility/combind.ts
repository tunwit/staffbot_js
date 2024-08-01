import type { SlashCommandBuilder } from "discord.js";

type CommandObj = {
    command:SlashCommandBuilder,
    action:CallableFunction
}
class Combine { 
    commands:CommandObj[] = []
    add(command:SlashCommandBuilder,action:CallableFunction){
        this.commands.push({
            command:command,
            action:action
        })
    }
}
export {Combine,type CommandObj}