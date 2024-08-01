import fs from "node:fs"
import path from "node:path"
import { SlashCommandBuilder, type Client } from 'discord.js';
import type { Combine, CommandObj } from "../utility/combind";
import combind from "../commands/ping";


const foldersPath:string = path.join(Bun.main,"commands");

const files = fs.readdirSync(foldersPath).filter((file:String) => file.endsWith('.ts'))

var commandInstance:CommandObj[] = []
async function load(bot:Client) {
	let allcommands:SlashCommandBuilder[] = []
	console.log(1);
	
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


