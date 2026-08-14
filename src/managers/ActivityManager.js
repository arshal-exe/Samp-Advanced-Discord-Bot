import {
    ActivityType
} from "discord.js";

import StatusManager from "./StatusManager.js";

class ActivityManager {

    constructor() {

        this.index = 0;
        this.interval = null;

    }

    start(client) {

        const update = async () => {

            try {

                const guild = client.guilds.cache.first();

                const memberCount = guild?.memberCount || 0;

                const server = StatusManager.server || {};

                const players = server.players ?? 0;
                const maxPlayers = server.maxPlayers ?? 0;
                const hostname = server.hostname || guild?.name;

                const activities = [

                    {
                        type: ActivityType.Playing,
                        name: hostname
                    },

                    {
                        type: ActivityType.Watching,
                        name: `${players} / ${maxPlayers} Players`
                    },

                    {
                        type: ActivityType.Watching,
                        name: `${memberCount} Community Members`
                    },

                    {
                        type: ActivityType.Listening,
                        name: "Samp DevCore"
                    },

                    {
                        type: ActivityType.Competing,
                        name: "Developed by Arshal"
                    }

                ];

                client.user.setActivity(

                    activities[this.index].name,

                    {

                        type: activities[this.index].type

                    }

                );

                this.index++;

                if (this.index >= activities.length)
                    this.index = 0;

            } catch (err) {

                console.error("[ACTIVITY]", err);

            }

        };

        update();

        this.interval = setInterval(update, 15000);

        console.log("[ACTIVITY] Activity Manager Started.");

    }

}

export default new ActivityManager();