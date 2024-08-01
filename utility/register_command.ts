import fs from "node:fs"
import path from "node:path"
import { SlashCommandBuilder, type Client, type SlashCommandOptionsOnlyBuilder } from 'discord.js';
import type { Combine, CommandObj } from "./combind";


const foldersPath:string = path.join(process.cwd(),"commands");
console.log(foldersPath);

const files = fs.readdirSync(foldersPath).filter((file:String) => file.endsWith('.ts'))

var commandInstance:CommandObj[] = []
async function load(bot:Client) {
	let allcommands:SlashCommandBuilder|SlashCommandOptionsOnlyBuilder[] = []
	
	for (const file of files) {
		const commandsPath = path.join(foldersPath, file);
		const combind:Combine = await import(commandsPath).then(module=>{return module.default});
		combind.commands.map(commandOBJ=>{
			allcommands.push(commandOBJ.command)
			commandInstance.push(commandOBJ)
		})
	}
	bot.application?.commands.set(allcommands)
	console.log(`[SUCCESS] Create application command `);
	
}

export {load,commandInstance}


