import fs from "fs";
import {
    AttachmentBuilder,
    EmbedBuilder
} from "discord.js";

import BackupManager from "../../managers/BackupManager.js";
import config from "../../config/config.js";

export default async function sendBackup(
    client,
    file,
    filename,
    requestedBy = null
) {

    const channel = await client.channels.fetch(
        BackupManager.data.channelId
    );

    if (!channel)
        return;

    const stats = fs.statSync(file);

    const size = (stats.size / 1024 / 1024).toFixed(2);

    const attachment = new AttachmentBuilder(file, {

        name: `${filename}.sql.gz`

    });

    const embed = new EmbedBuilder()

        .setColor("#57F287")

        .setTitle("💾 Database Backup")

        .setDescription(
            "A new database backup has been successfully created."
        )

        .addFields(

            {
                name: "🗄 Database",
                value: `\`${config.mysql.database}\``,
                inline: true
            },

            {
                name: "📦 Format",
                value: "`SQL + GZIP`",
                inline: true
            },

            {
                name: "📁 File Size",
                value: `\`${size} MB\``,
                inline: true
            },

            {
                name: "⚡ Trigger",
                value: requestedBy
                    ? `Manual (${requestedBy})`
                    : "Automatic (30 Minutes)"
            },

            {
                name: "📄 File Name",
                value: `\`${filename}.sql.gz\``
            }

        )

        .setTimestamp()

        .setFooter({

            text: "SAMP DevCore Backup System"

        });

    await channel.send({
        embeds: [embed]
    });
    await channel.send({
        files: [attachment]
    });

}