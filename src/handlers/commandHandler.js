import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import logger from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function loadCommands(client) {

    const commandPath = path.join(__dirname, "../commands");

    const folders = fs.readdirSync(commandPath);

    for (const folder of folders) {

        const files = fs
            .readdirSync(path.join(commandPath, folder))
            .filter(file => file.endsWith(".js"));

        for (const file of files) {

            const command = await import(`../commands/${folder}/${file}`);

            client.commands.set(command.default.data.name, command.default);

            logger.info(`Loaded Command -> ${command.default.data.name}`);

        }

    }

}