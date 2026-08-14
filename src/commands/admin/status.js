import { SlashCommandBuilder } from "discord.js";

import setup from "../../status/setup.js";
import refresh from "../../status/refresh.js";
import disable from "../../status/disable.js";

import requireAdmin from "../../utils/permissions/requireAdmin.js";

export default {

    data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Manage the server status")
        .addSubcommand(sub =>
            sub
                .setName("setup")
                .setDescription("Setup the live status")
        )
        .addSubcommand(sub =>
            sub
                .setName("refresh")
                .setDescription("Refresh the live status")
        )
        .addSubcommand(sub =>
            sub
                .setName("disable")
                .setDescription("Disable the live status")
        ),

    async execute(interaction) {

        const sub = interaction.options.getSubcommand();

        if (!(await requireAdmin(interaction)))
            return;

        switch (sub) {

            case "setup":
                return setup(interaction);

            case "refresh":
                return refresh(interaction);

            case "disable":
                return disable(interaction);

        }

    }

};