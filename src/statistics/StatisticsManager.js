import fs from "fs/promises";
import path from "path";

    class StatisticsManager {
        constructor() {
            this.stats = null;
            this.history = [];
            this.loaded = false;

            this.dataFolder = path.resolve("src/data/status");
            this.statsFile = path.join(this.dataFolder, "stats.json");
            this.historyFile = path.join(this.dataFolder, "history.json");
            this.metaFile = path.join(this.dataFolder, "meta.json");

    }

    async init() {

        this.stats = JSON.parse(
            await fs.readFile(this.statsFile, "utf8")
        );

        this.history = JSON.parse(
            await fs.readFile(this.historyFile, "utf8")
        );

        this.loaded = true;

        console.log("✓ Statistics Loaded");

    }

    async save() {

        await fs.writeFile(

            this.statsFile,
            JSON.stringify(this.stats, null, 4)

        );

        await fs.writeFile(

            this.historyFile,
            JSON.stringify(this.history, null, 4)

        );

    }

    async update(serverData) {

        if (!this.loaded) return;

        // Current Players
        this.stats.players.current = serverData.players;

        // Peak Players
        if (serverData.players > this.stats.players.peak) {
            this.stats.players.peak = serverData.players;
        }

        // Current Ping
        this.stats.ping.current = serverData.ping;

        // Highest Ping
        if (serverData.ping > this.stats.ping.highest) {
            this.stats.ping.highest = serverData.ping;
        }

        // Lowest Ping
        if (serverData.ping < this.stats.ping.lowest) {
            this.stats.ping.lowest = serverData.ping;
        }

        // Daily Average
        this.stats.daily.samples++;
        this.stats.daily.totalPlayers += serverData.players;
        this.stats.daily.averagePlayers = Math.round(
            this.stats.daily.totalPlayers /
            this.stats.daily.samples
        );

        // Weekly Average
        this.stats.weekly.samples++;
        this.stats.weekly.totalPlayers += serverData.players;
        this.stats.weekly.averagePlayers = Math.round(
            this.stats.weekly.totalPlayers /
            this.stats.weekly.samples
        );

        // Monthly Average
        this.stats.monthly.samples++;
        this.stats.monthly.totalPlayers += serverData.players;
        this.stats.monthly.averagePlayers = Math.round(
            this.stats.monthly.totalPlayers /
            this.stats.monthly.samples
        );

        // Store History
        this.history.push(serverData.players);

        // Keep only last 200 entries
        if (this.history.length > 200) {
            this.history.shift();
        }

    }

    getStats() {
        return this.stats;
    }

    getHistory() {
        return this.history;
    }

}

export default new StatisticsManager();