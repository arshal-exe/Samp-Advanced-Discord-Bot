import {
    EmbedBuilder,
    MessageFlags
} from "discord.js";

import StatusManager from "../../managers/StatusManager.js";
import StatisticsManager from "../../statistics/StatisticsManager.js";

export default async function details(interaction) {

    const server = StatusManager.getServer();

    if (!server || !server.online) {

        return interaction.reply({
            content: "❌ Server is currently offline.",
            flags: MessageFlags.Ephemeral
        });

    }

    const stats = StatisticsManager.getStats();

    const embed = new EmbedBuilder()

        .setColor(0x5865F2)

        .setTitle("📊 Server Details")

        .addFields(

            {
                name: "🖥 Server Information",
                value:
`**Hostname:** ${server.hostname}
**Gamemode:** ${server.gamemode}
**Language:** ${server.language}
**Map:** ${server.map}
**Status:** Online`
            },

            {
                name: "👥 Player Statistics",
                value:
`**Current Players:** ${server.players}/${server.maxPlayers}
**Peak Players:** ${stats.players.peak}
**Daily Average:** ${stats.daily.averagePlayers}
**Weekly Average:** ${stats.weekly.averagePlayers}
**Monthly Average:** ${stats.monthly.averagePlayers}`
            },

            {
                name: "📈 Activity",
                value:
`**Highest Today:** ${stats.players.peak}
**Current Load:** ${Math.round((server.players / server.maxPlayers) * 100)}%
**Updated:** <t:${Math.floor(Date.now() / 1000)}:R>`
            }

        )

        .setFooter({
            text: "Powered by Samp DevCore",
        })

        .setTimestamp();

    return interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral
    });

}