import {
    SlashCommandBuilder,
    ChannelType
} from "discord.js";

import requireAdmin from "../../utils/permissions/requireAdmin.js";

import setup from "../../invite/setup.js";
import disable from "../../invite/disable.js";
import check from "../../invite/check.js";
import reset from "../../invite/reset.js";

export default {

    data: new SlashCommandBuilder()

        .setName("invite")
        .setDescription("Manage invite tracker")

        .addSubcommand(sub =>
            sub
                .setName("setup")
                .setDescription("Setup invite tracker")

                .addChannelOption(option =>
                    option
                        .setName("channel")
                        .setDescription("Invite log channel")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub
                .setName("disable")
                .setDescription("Disable invite tracker")
        )

        .addSubcommand(sub =>
            sub
                .setName("check")
                .setDescription("Check a user's invites")

                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("User")
                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub
                .setName("reset")
                .setDescription("Reset a user's invites")

                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("User")
                        .setRequired(true)
                )
        ),

    async execute(interaction) {

        console.log(interaction.options.data);
        const sub = interaction.options.getSubcommand();

        if (sub === "check")
            return check(interaction);

        if (!(await requireAdmin(interaction)))
            return;

        switch (sub) {

            case "setup":
                return setup(interaction);

            case "disable":
                return disable(interaction);

            case "reset":
                return reset(interaction);

        }

    }

};