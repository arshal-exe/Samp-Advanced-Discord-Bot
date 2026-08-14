import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import logger from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function loadEvents(client) {

    let eventCount = 0;

    logger.system(3, 12, "Loading Events...");

    const eventFolders = fs.readdirSync(
        path.join(__dirname, "../events")
    );

    for (const folder of eventFolders) {

        const files = fs
            .readdirSync(path.join(__dirname, `../events/${folder}`))
            .filter(file => file.endsWith(".js"));

        for (const file of files) {

            eventCount++;

            const event = await import(`../events/${folder}/${file}`);

            logger.success(`Loaded Event -> ${file}`);

            if (event.default.once) {

                client.once(event.default.name, (...args) =>
                    event.default.execute(...args, client)
                );

            } else {

                client.on(event.default.name, (...args) =>
                    event.default.execute(...args, client)
                );

            }

        }

    }

    client.eventCount = eventCount;

}