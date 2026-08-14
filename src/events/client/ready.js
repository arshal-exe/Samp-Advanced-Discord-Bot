import logger from "../../utils/logger.js";
import InviteManager from "../../managers/InviteManager.js";

export default {

    name: "clientReady",

    once: true,

    async execute(client) {

        logger.summary(client);
        logger.success(`${client.user.tag} is Online`);

        // Load invite cache
        for (const guild of client.guilds.cache.values()) {

            try {

                const invites = await guild.invites.fetch();

                InviteManager.cache[guild.id] = {};

                for (const invite of invites.values()) {

                    InviteManager.cache[guild.id][invite.code] = {
                        uses: invite.uses,
                        inviter: invite.inviter?.id
                    };

                }

            } catch (err) {

                logger.error(`Failed to cache invites for ${guild.name}: ${err.message}`);

            }

        }

        await InviteManager.saveCache();

        logger.success("Invite cache loaded.");

    }

};