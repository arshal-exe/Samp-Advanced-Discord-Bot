import { MessageFlags } from "discord.js";

import BackupManager from "../managers/BackupManager.js";

export default async function setup(interaction) {

    const channel = interaction.options.getChannel("channel");

    if (BackupManager.isEnabled()) {

        return interaction.reply({

            content: "❌ Backup system is already enabled.",

            flags: MessageFlags.Ephemeral

        });

    }

    await BackupManager.configure(channel.id);

    await BackupManager.start(interaction.client);

    return interaction.reply({

        content: `✅ Automatic backups enabled.\n📦 Channel: ${channel}`,

        flags: MessageFlags.Ephemeral

    });

}