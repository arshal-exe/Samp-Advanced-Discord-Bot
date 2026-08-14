import { MessageFlags } from "discord.js";

import BackupManager from "../managers/BackupManager.js";

export default async function disable(interaction) {

    if (!BackupManager.isEnabled()) {

        return interaction.reply({

            content: "❌ Backup system is already disabled.",

            flags: MessageFlags.Ephemeral

        });

    }

    await BackupManager.disable();

    return interaction.reply({

        content: "✅ Automatic backup system disabled.",

        flags: MessageFlags.Ephemeral

    });

}