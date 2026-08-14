import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from "discord.js";

import config from "../config/config.js";

export default function createStatusButtons() {

    const components = [

        new ButtonBuilder()
            .setCustomId("status_refresh")
            .setLabel("Refresh")
            .setEmoji("🔄")
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId("status_players")
            .setLabel("Players")
            .setEmoji("👥")
            .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
            .setCustomId("status_details")
            .setLabel("Details")
            .setEmoji("📊")
            .setStyle(ButtonStyle.Secondary)

    ];

    if (config.website) {

        components.push(

            new ButtonBuilder()
                .setLabel("Website")
                .setEmoji("🌐")
                .setStyle(ButtonStyle.Link)
                .setURL(config.website)

        );

    }

    return new ActionRowBuilder().addComponents(components);

}