import StatusManager from "../managers/StatusManager.js";
import { MessageFlags } from "discord.js";

export default async function refresh(interaction) {

    await StatusManager.update();

    return interaction.reply({
        content: "✅ Dashboard refreshed successfully.",
        flags: MessageFlags.Ephemeral
    });

}