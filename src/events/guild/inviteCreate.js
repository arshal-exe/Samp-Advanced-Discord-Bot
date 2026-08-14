import { Events } from "discord.js";
import InviteManager from "../../managers/InviteManager.js";

export default {

    name: Events.InviteCreate,

    async execute(invite) {

        if (!InviteManager.cache[invite.guild.id])
            InviteManager.cache[invite.guild.id] = {};

        InviteManager.cache[invite.guild.id][invite.code] = {

            uses: invite.uses,
            inviter: invite.inviter.id

        };

        await InviteManager.saveCache();

    }

};