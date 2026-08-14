import { Events } from "discord.js";
import InviteManager from "../../managers/InviteManager.js";

export default {

    name: Events.InviteDelete,

    async execute(invite) {

        delete InviteManager.cache[invite.guild.id]?.[invite.code];

        await InviteManager.saveCache();

    }

};