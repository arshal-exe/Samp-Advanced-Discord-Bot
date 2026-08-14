import fs from "fs/promises";
import path from "path";

import createBackup from "../services/backup/createBackup.js";

class BackupManager {

    constructor() {

        this.file = path.resolve("src/data/backup/config.json");

        this.data = null;

        this.client = null;
        this.interval = null;

    }

    async init() {

        this.data = JSON.parse(
            await fs.readFile(this.file, "utf8")
        );

    }

    async save() {

        await fs.writeFile(
            this.file,
            JSON.stringify(this.data, null, 4)
        );

    }

    isEnabled() {

        return this.data.enabled;

    }

    async configure(channelId) {

        this.data.enabled = true;
        this.data.channelId = channelId;

        await this.save();

    }

    async disable() {

        this.data.enabled = false;
        this.data.channelId = null;

        await this.save();

        if (this.interval) {

            clearInterval(this.interval);
            this.interval = null;

        }

    }

    async start(client) {

        this.client = client;

        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        if (!this.isEnabled())
            return;

        console.log("[BACKUP] Auto Backup Started.");

        this.interval = setInterval(async () => {

            try {

                await createBackup(client);

            } catch (err) {

                console.error("[BACKUP]", err);

            }

        }, 2 * 60 * 1000);

    }

}

export default new BackupManager();