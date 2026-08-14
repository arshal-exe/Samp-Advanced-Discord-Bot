import { MessageFlags } from "discord.js";

import StatusManager from "../../managers/StatusManager.js";

const cooldown = new Map();

export default async function refresh(interaction) {

    const userId = interaction.user.id;

    if (cooldown.has(userId)) {

        return interaction.reply({
            content: "⏳ Please wait a few seconds before refreshing again.",
            flags: MessageFlags.Ephemeral
        });

    }

    cooldown.set(userId, true);

    setTimeout(() => {
        cooldown.delete(userId);
    }, 5000);

    await interaction.deferReply({
        flags: MessageFlags.Ephemeral
    });

    try {

        await StatusManager.update();

        await interaction.editReply({
            content: "✅ Dashboard refreshed successfully."
        });

    } catch (err) {

        console.error(err);

        await interaction.editReply({
            content: "❌ Failed to refresh the dashboard."
        });

    }

}