import { MessageFlags } from "discord.js";

import createBackup from "../services/backup/createBackup.js";

export default async function now(interaction) {

    await interaction.reply({

        content: "⏳ Creating database backup...",

        flags: MessageFlags.Ephemeral

    });

    await createBackup(

        interaction.client,

        interaction.user.tag

    );

}