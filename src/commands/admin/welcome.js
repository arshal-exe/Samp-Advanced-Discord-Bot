import { SlashCommandBuilder, ChannelType } from "discord.js";

import setup from "../../welcome/setup.js";
import preview from "../../welcome/preview.js";
import disable from "../../welcome/disable.js";

import requireAdmin from "../../utils/permissions/requireAdmin.js";

export default {

    data: new SlashCommandBuilder()
        .setName("welcome")
        .setDescription("Manage the welcome system")

        .addSubcommand(sub =>
            sub
                .setName("setup")
                .setDescription("Setup the welcome system")

                .addChannelOption(option =>
                    option
                        .setName("channel")
                        .setDescription("Welcome channel")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )

                .addAttachmentOption(option =>
                    option
                        .setName("background")
                        .setDescription("Welcome background image")
                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub
                .setName("preview")
                .setDescription("Preview the welcome card")
        )

        .addSubcommand(sub =>
            sub
                .setName("disable")
                .setDescription("Disable the welcome system")
        ),

    async execute(interaction) {

        if (!(await requireAdmin(interaction)))
            return;

        const sub = interaction.options.getSubcommand();

        switch (sub) {

            case "setup":
                return setup(interaction);

            case "preview":
                return preview(interaction);

            case "disable":
                return disable(interaction);

        }

    }

};