import {
    AttachmentBuilder,
    MessageFlags
} from "discord.js";

import generateWelcomeCard from "../services/welcome/canvas.js";

export default async function preview(interaction) {

    const image = await generateWelcomeCard(interaction.member);

    const attachment = new AttachmentBuilder(image, {
        name: "welcome.png"
    });

    await interaction.reply({

        content:
`👋 **Welcome ${interaction.user}** to **${interaction.guild.name}**!`,

        files: [attachment],

        flags: MessageFlags.Ephemeral

    });

}