import { MessageFlags } from "discord.js";
import downloadBackground from "../services/welcome/downloadBackground.js";
import WelcomeManager from "../managers/WelcomeManager.js";

export default async function setup(interaction) {

    const channel = interaction.options.getChannel("channel");
    const attachment = interaction.options.getAttachment("background");

    try {

        await downloadBackground(attachment.url);

        WelcomeManager.data.enabled = true;
        WelcomeManager.data.guildId = interaction.guild.id;
        WelcomeManager.data.channelId = channel.id;
        WelcomeManager.data.background = "background.png";

        await WelcomeManager.save();

        return interaction.reply({
            content: "✅ Welcome system configured successfully.",
            flags: MessageFlags.Ephemeral
        });

    } catch (err) {

        console.error(err);

        return interaction.reply({
            content: "❌ Failed to download the background image.",
            flags: MessageFlags.Ephemeral
        });

    }

}