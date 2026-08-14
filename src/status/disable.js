import { MessageFlags } from "discord.js";
import StatusManager from "../managers/StatusManager.js";

export default async function disable(interaction) {

    if (!StatusManager.isConfigured()) {
        return interaction.reply({
            content: "❌ Status system is not configured.",
            flags: MessageFlags.Ephemeral
        });
    }

    try {

        await StatusManager.disableStatus();

        return interaction.reply({
            content: "✅ Status system disabled successfully.",
            flags: MessageFlags.Ephemeral
        });

    } catch (err) {

        console.error(err);

        return interaction.reply({
            content: "❌ Failed to disable the status system.",
            flags: MessageFlags.Ephemeral
        });

    }

}