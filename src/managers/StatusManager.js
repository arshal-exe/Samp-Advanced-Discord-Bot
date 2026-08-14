import fs from "fs/promises";
import path from "path";
import { queryServer } from "../services/samp/query.js";
import createStatusEmbed from "../embeds/statusEmbed.js";
import createStatusButtons from "../components/statusButtons.js";
import StatisticsManager from "../statistics/StatisticsManager.js";

class StatusManager {

    constructor() {
        this.file = path.resolve("src/data/status/message.json");

        this.data = null;
        this.interval = null;
        this.message = null;
        this.server = null;
        this.client = null;
    }

    async start(client) {

        if (!this.data.enabled)
            return;

        this.client = client;

        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        try {

            const guild = await client.guilds.fetch(this.data.guildId);
            const channel = await guild.channels.fetch(this.data.channelId);

            try {

                this.message = await channel.messages.fetch(this.data.messageId);

            } catch {

                console.warn("[STATUS] Dashboard message not found. Recreating...");

                await this.recreateDashboard(channel);
            }

            await this.update();

            this.interval = setInterval(() => {
                this.update().catch(console.error);
            }, 20000);

            console.log("[STATUS] Status manager started.");

        } catch (err) {

            console.error("[STATUS] Failed to start:", err.message);

            await this.disableStatus();
        }
    }

    async update() {

        if (!this.data.enabled || !this.message)
            return;

        let server;

        try {

            server = await queryServer();
            this.server = server;

        } catch (err) {

            console.error("[STATUS] Failed to query server:", err.message);
            return;
        }

        try {

            await StatisticsManager.update(server);
            await StatisticsManager.save();

        } catch (err) {

            console.error("[STATUS] Failed to update statistics:", err.message);
        }

        const embed = createStatusEmbed(server, this.message.guild);

        try {

            await this.message.edit({
                embeds: [embed],
                components: [createStatusButtons()]
            });

        } catch (err) {

            switch (err.code) {

                // Unknown Message
                case 10008:

                    console.warn("[STATUS] Dashboard deleted. Recreating...");

                    await this.recreateDashboard(this.message.channel);
                    break;

                // Missing Permissions
                case 50013:

                    console.error("[STATUS] Missing permissions to edit dashboard.");
                    break;

                default:

                    console.error("[STATUS] Failed to update dashboard:", err);
                    break;
            }
        }
    }

    async recreateDashboard(channel) {

        if (!this.data.enabled)
            return;

        try {

            const server = await queryServer();
            this.server = server;

            const embed = createStatusEmbed(server, channel.guild);

            const message = await channel.send({
                embeds: [embed],
                components: [createStatusButtons()]
            });

            this.message = message;
            this.data.messageId = message.id;

            await this.save();

            console.log("[STATUS] Dashboard recreated successfully.");

            awa

        } catch (err) {

            console.error("[STATUS] Failed to recreate dashboard:", err.message);
        }
    }

    async disableStatus() {

        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        if (this.message) {
            try {
                await this.message.delete();
            } catch {}
        }

        this.message = null;
        this.server = null;

        this.data = {
            enabled: false,
            guildId: null,
            channelId: null,
            messageId: null
        };

        await this.save();

        console.warn("[STATUS] Status system disabled.");
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

    getServer() {
        return this.server;
    }

    isConfigured() {
        return this.data.enabled;
    }

}

export default new StatusManager();