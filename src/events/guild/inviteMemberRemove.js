import { Events } from "discord.js";
import InviteManager from "../../managers/InviteManager.js";

export default {

    name: Events.GuildMemberRemove,

    once: false,

    async execute(member) {

        try {

            const data = InviteManager.members[member.id];

            if (!data)
                return;

            const inviterId = data.inviter;

            InviteManager.incrementLeaves(inviterId);

            const diff = Date.now() - data.joinedAt;

            if (diff < 86400000) {

                InviteManager.incrementFake(inviterId);

            }

            InviteManager.members[member.id].left = true;

            await InviteManager.saveUsers();
            await InviteManager.saveMembers();

        } catch (err) {

            console.error("[INVITE REMOVE]", err);

        }

    }

};