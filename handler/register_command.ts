import type { Client } from 'discord.js';
const fs = require('node:fs');
const path = require('node:path');

const commands:String[] = [];
const foldersPath:String = path.join(Bun.main,"commands");

const files = fs.readdirSync(foldersPath).filter((file:String) => file.endsWith('.ts'))

async function load(bot:Client) {
	var allcommands:String[] = []
	var fetchall = await bot.application?.commands.fetch()
	if (fetchall){
		allcommands= fetchall.map(app=>{
			return app.name;
		})
	}

	for (const file of files) {
		const commandsPath = path.join(foldersPath, file);
		const command = require(commandsPath);
		if (!('data' in command) && ('execute' in command)) {
			console.log(`[WARNING] The command at ${commandsPath} is missing a required "data" or "execute" property.`);
			continue
		}
		else if (allcommands.includes(command.data.name)){
			allcommands?.shift()
			console.log(`pop ${command.data.name}`);
			continue
		}
		console.log("create");
		
		bot.application?.commands.create(
			{
				name: command.data.name,
				description: command.data.description,
			}
		)

		console.log(`[SUCCESS] Create application command ${command.data.name}`);
	}
	var fetchall = await bot.application?.commands.fetch()
	
	if (fetchall){
		fetchall.map(app=>{
			console.log(`after ${allcommands}`);
			
			if(allcommands.includes(app.name)){
				app.delete()
				console.log(`[DELETE] Delete application command ${app.name}`);
			}
		})
	}
}

export default load


