import {
    EmbedBuilder
} from "discord.js";

import StatusManager from "../managers/StatusManager.js";
import createStatusEmbed from "../embeds/statusEmbed.js";
import { queryServer } from "../services/samp/query.js";

import createStatusButtons from "../components/statusButtons.js";

export default async function setup(interaction) {
    if (StatusManager.isConfigured()) {
        return interaction.reply({
            content: "❌ Status system is already configured.",
            ephemeral: true
        });
    }

    const server = await queryServer();

    const embed = createStatusEmbed(server, interaction.guild);

    const message = await interaction.channel.send({
        embeds: [embed],
        components: [createStatusButtons()]
    });

    StatusManager.data = {
        enabled: true,
        guildId: interaction.guild.id,
        channelId: interaction.channel.id,
        messageId: message.id
    };

    await StatusManager.save();
    return interaction.reply({
        content: "✅ Status system configured successfully.",
        ephemeral: true

    });

    StatusManager.message = message;

}