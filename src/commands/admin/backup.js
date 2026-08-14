import {
    SlashCommandBuilder,
    ChannelType
} from "discord.js";

import requireAdmin from "../../utils/permissions/requireAdmin.js";

import setup from "../../backup/setup.js";
import disable from "../../backup/disable.js";
import now from "../../backup/now.js";

export default {

    data: new SlashCommandBuilder()

        .setName("backup")
        .setDescription("Manage database backups")

        .addSubcommand(sub =>
            sub
                .setName("setup")
                .setDescription("Setup automatic database backups")

                .addChannelOption(option =>
                    option
                        .setName("channel")
                        .setDescription("Backup channel")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub
                .setName("now")
                .setDescription("Create a backup immediately")
        )

        .addSubcommand(sub =>
            sub
                .setName("disable")
                .setDescription("Disable automatic backups")
        ),

    async execute(interaction) {

        if (!(await requireAdmin(interaction)))
            return;

        const sub = interaction.options.getSubcommand();

        switch (sub) {

            case "setup":
                return setup(interaction);

            case "now":
                return now(interaction);

            case "disable":
                return disable(interaction);

        }

    }

};