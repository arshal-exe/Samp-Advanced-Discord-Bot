import { REST, Routes } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import config from "../config/config.js";
import logger from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function deployCommands() {

    const commands = [];

    const commandPath = path.join(__dirname, "../commands");
    const folders = fs.readdirSync(commandPath);

    for (const folder of folders) {

        const files = fs
            .readdirSync(path.join(commandPath, folder))
            .filter(file => file.endsWith(".js"));

        for (const file of files) {

            const command = await import(`../commands/${folder}/${file}`);

            commands.push(command.default.data.toJSON());

        }

    }

    const rest = new REST({ version: "10" }).setToken(config.token);

    try {

        logger.info(`Registering ${commands.length} slash command(s)...`);

        await rest.put(
            Routes.applicationGuildCommands(
                config.clientId,
                config.guildId
            ),
            { body: commands }
        );


        logger.system(2,12,"Loading Commands...");
        logger.success("Slash commands registered successfully.");

    } catch (error) {

        logger.error(error.message);

    }

}