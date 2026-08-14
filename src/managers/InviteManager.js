import fs from "fs/promises";
import path from "path";

class InviteManager {

    constructor() {

        this.configFile = path.resolve("src/data/invites/config.json");
        this.cacheFile = path.resolve("src/data/invites/cache.json");
        this.usersFile = path.resolve("src/data/invites/users.json");
        this.membersFile = path.resolve("src/data/invites/members.json");

        this.config = null;
        this.cache = {};
        this.users = {};
        this.members = {};

    }

    async init() {

        this.config = JSON.parse(
            await fs.readFile(this.configFile, "utf8")
        );

        this.cache = JSON.parse(
            await fs.readFile(this.cacheFile, "utf8")
        );

        this.users = JSON.parse(
            await fs.readFile(this.usersFile, "utf8")
        );

        this.members = JSON.parse(
            await fs.readFile(this.membersFile, "utf8")
        );

    }

    async saveConfig() {

        await fs.writeFile(
            this.configFile,
            JSON.stringify(this.config, null, 4)
        );

    }

    async saveCache() {

        await fs.writeFile(
            this.cacheFile,
            JSON.stringify(this.cache, null, 4)
        );

    }

    async saveUsers() {

        await fs.writeFile(
            this.usersFile,
            JSON.stringify(this.users, null, 4)
        );

    }

    isEnabled() {

        return this.config?.enabled === true;

    }

    async configure(guildId, channelId) {

        this.config.enabled = true;
        this.config.guildId = guildId;
        this.config.channelId = channelId;

        await this.saveConfig();

    }

    async disable() {

        this.config = {
            enabled: false,
            guildId: null,
            channelId: null
        };

        this.cache = {};
        this.users = {};
        this.members = {};

        await this.saveConfig();
        await this.saveCache();
        await this.saveUsers();
        await this.saveMembers();

    }

    async saveMembers() {

        await fs.writeFile(
            this.membersFile,
            JSON.stringify(this.members, null, 4)
        );

    }

    addInvite(userId) {

        if (!this.users[userId]) {

            this.users[userId] = {
                invites: 0
            };

        }

        this.users[userId].invites++;

    }

    getInvites(userId) {

        return this.users[userId]?.invites || 0;

    }

    resetInvites(userId) {

        this.createUser(userId);

        this.users[userId].joined = 0;
        this.users[userId].leaves = 0;
        this.users[userId].fake = 0;
        this.users[userId].rejoins = 0;
        this.users[userId].bonus = 0;

    }

    createUser(userId) {
        if (this.users[userId])
            return;
        this.users[userId] = {
            joined: 0,
            leaves: 0,
            fake: 0,
            rejoins: 0,
            bonus: 0
        };
    }

    incrementJoined(userId) {

        this.createUser(userId);
        this.users[userId].joined++;

    }

    incrementFake(userId) {

        this.createUser(userId);
        this.users[userId].fake++;

    }

    incrementRejoin(userId) {

        this.createUser(userId);

        this.users[userId].rejoins++;

    }

    incrementLeaves(userId) {

        this.createUser(userId);
        this.users[userId].leaves++;

    }

    getStats(userId) {

        this.createUser(userId);
        const data = this.users[userId];
        return {

            ...data,

            current:

                data.joined
                - data.leaves
                - data.fake
                + data.bonus

        };

    }

}

export default new InviteManager();