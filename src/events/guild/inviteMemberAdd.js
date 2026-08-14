import { Events } from "discord.js";
import InviteManager from "../../managers/InviteManager.js";

export default {

    name: Events.GuildMemberAdd,

    once: false,

    async execute(member) {

        try {

            if (!InviteManager.isEnabled())
                return;

            if (member.guild.id !== InviteManager.config.guildId)
                return;

            const oldCache = InviteManager.cache[member.guild.id] || {};

            const invites = await member.guild.invites.fetch();

            let usedInvite = null;

            for (const invite of invites.values()) {

                const oldUses = oldCache[invite.code]?.uses || 0;

                if (invite.uses > oldUses) {

                    usedInvite = invite;
                    break;

                }

            }

            // Update cache
            InviteManager.cache[member.guild.id] = {};

            for (const invite of invites.values()) {

                InviteManager.cache[member.guild.id][invite.code] = {

                    uses: invite.uses,
                    inviter: invite.inviter?.id

                };

            }

            await InviteManager.saveCache();

            const channel = member.guild.channels.cache.get(
                InviteManager.config.channelId
            );

            if (!channel)
                return;

            // Vanity / Unknown Invite
            if (!usedInvite || !usedInvite.inviter) {

                await channel.send({

                    content:
`${member.user.username} joined the server.

━━━━━━━━━━━━━━━━━━━━

➤ 👤 Member      : ${member}
➤ 🔗 Invited By : Unknown / Vanity Invite
➤ 👥 Members    : ${member.guild.memberCount}

━━━━━━━━━━━━━━━━━━━━`

                });

                return;

            }

            const inviterId = usedInvite.inviter.id;

            if (
                InviteManager.members[member.id] &&
                InviteManager.members[member.id].left
            ) {

                InviteManager.incrementRejoin(inviterId);

                InviteManager.members[member.id].left = false;
                InviteManager.members[member.id].joinedAt = Date.now();

            } else {

                InviteManager.incrementJoined(inviterId);

                InviteManager.members[member.id] = {

                    inviter: inviterId,
                    joinedAt: Date.now(),
                    left: false

                };

            }

            await InviteManager.saveUsers();
            await InviteManager.saveMembers();

            await channel.send({

                content:
`${member.user.username} joined using an invite.

━━━━━━━━━━━━━━━━━━━━

➤ 👤 Member      : ${member}
➤ 🔗 Invited By : <@${usedInvite.inviter.id}>
➤ 📈 Invites    : ${InviteManager.getStats(inviterId).current}
➤ 👥 Members    : ${member.guild.memberCount}

━━━━━━━━━━━━━━━━━━━━`

            });

        } catch (err) {

            console.error("[INVITE]", err);

        }

    }

};