import config from "../config/config.js";

import loadCommands from "../handlers/commandHandler.js";
import loadEvents from "../handlers/eventHandler.js";
import deployCommands from "../handlers/commandDeploy.js";

import { connectDatabase } from "../database/mysql.js";

import StatusManager from "../managers/StatusManager.js";
import StatisticsManager from "../statistics/StatisticsManager.js";
import WelcomeManager from "../managers/WelcomeManager.js";
import InviteManager from "../managers/InviteManager.js";

import BackupManager from "../managers/BackupManager.js";

import ActivityManager from "../managers/ActivityManager.js";

import logger from "../utils/logger.js";

export default async function bootstrap(client) {

    logger.banner();

    await connectDatabase();
    await StatisticsManager.init();
    await WelcomeManager.init();
    await InviteManager.init();
    await BackupManager.init();

    // Save statistics every 5 minutes
    setInterval(async () => {
        await StatisticsManager.save();
        console.log("✓ Statistics Saved");
    }, 5 * 60 * 1000);

    // Save before shutdown
    process.on("SIGINT", async () => {
        console.log("Saving statistics...");
        await StatisticsManager.save();
        process.exit(0);
    });

    process.on("SIGTERM", async () => {
        console.log("Saving statistics...");
        await StatisticsManager.save();
        process.exit(0);
    });

    await loadCommands(client);
    await deployCommands();
    await loadEvents(client);
    await StatusManager.init();

    await client.login(config.token);
    await StatusManager.start(client);
    await BackupManager.start(client);
    ActivityManager.start(client);

}