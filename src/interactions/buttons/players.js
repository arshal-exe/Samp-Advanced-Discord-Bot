import {
    EmbedBuilder,
    MessageFlags
} from "discord.js";

import StatusManager from "../../managers/StatusManager.js";

export default async function players(interaction) {

    const server = StatusManager.getServer();

    if (!server || !server.online) {
        return interaction.reply({
            content: "❌ The server is currently offline.",
            flags: MessageFlags.Ephemeral
        });
    }

    const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle("👥 Online Players")
        .setDescription(
            `There are currently **${server.players}** players online.`
        )
        .addFields(
            {
                name: "Server Population",
                value: `${server.players}/${server.maxPlayers}`,
                inline: true
            }
        )
        .setFooter({
            text: "Real-time player count"
        })
        .setTimestamp();

    return interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral
    });

}