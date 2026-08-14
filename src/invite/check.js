import {
    EmbedBuilder,
    MessageFlags
} from "discord.js";

import InviteManager from "../managers/InviteManager.js";

export default async function check(interaction) {

    const user = interaction.options.getUser("user");

    const stats = InviteManager.getStats(user.id);

    const embed = new EmbedBuilder()
        .setColor(0x57F287)
        .setAuthor({
            name: `${user.username}`,
            iconURL: user.displayAvatarURL()
        })
        .setThumbnail(user.displayAvatarURL())
        .setDescription(
`Your invite statistics have been generated.

✅ **Total Invites:** ${stats.current}

👋 **Joined:** ${stats.joined}
🔄 **Rejoins:** ${stats.rejoins}
📤 **Leaves:** ${stats.leaves}
❌ **Fake Invites:** ${stats.fake}
⭐ **Bonus Invites:** ${stats.bonus}

🏆 **Current Invites:** ${stats.current}`
        )
        .setFooter({
            text: interaction.guild.name
        })
        .setTimestamp();

    return interaction.reply({

        embeds: [embed],
        flags: MessageFlags.Ephemeral

    });

}