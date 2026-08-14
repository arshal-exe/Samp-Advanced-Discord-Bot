import { EmbedBuilder } from "discord.js";

export default function buildHelpEmbed(category, client, categories) {

    const embed = new EmbedBuilder()

        .setColor(category.color)

        .setTitle(category.title)

        .setThumbnail(
            client.user.displayAvatarURL({
                size: 512
            })
        )

        .setFooter({

            text: `Samp DevCore • Version 1.0.0`

        })

        .setTimestamp();

    // Home
    if (category.id === "home") {

        embed.setDescription(category.description);

        return embed;

    }

    // Bot Information
    if (category.id === "botinfo") {

        embed

            .setDescription(
                "Information about the bot and developer."
            )

            .addFields(

                {
                    name: "Developer",
                    value: "**Arshal**\n<@1135547753771049050>",
                    inline: true
                },

                {
                    name: "Version",
                    value: "`v1.0.0`",
                    inline: true
                },

                {
                    name: "Status",
                    value: "`Stable`",
                    inline: true
                },

                {
                    name: "GitHub",
                    value: "[Profile](https://github.com/arshal-exe)",
                    inline: true
                },

                {
                    name: "YouTube",
                    value: "[Samp DevCore](https://youtube.com/@SampDevCore)",
                    inline: true
                },

                {
                    name: "Community",
                    value: "[Join Discord](https://discord.gg/H4HsWBCtPR)",
                    inline: true
                }

            );

        return embed;

    }

    const commandList = category.commands
        .map(cmd => `\`${cmd}\``)
        .join(" ");

    embed.setDescription(

`${category.description}

━━━━━━━━━━━━━━━━━━━━━━━━
### ${category.title.replace(/^[^\s]+\s/, "")}

${commandList}
━━━━━━━━━━━━━━━━━━━━━━━━

**Total Commands:** ${category.commands.length}`

    );

    return embed;

}