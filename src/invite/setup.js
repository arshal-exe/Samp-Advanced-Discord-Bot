import { MessageFlags } from "discord.js";
import InviteManager from "../managers/InviteManager.js";

export default async function setup(interaction) {

    const channel = interaction.options.getChannel("channel");

    await InviteManager.configure(
        interaction.guild.id,
        channel.id
    );

    return interaction.reply({

        content:
`✅ Invite tracker enabled.

Channel: ${channel}`,

        flags: MessageFlags.Ephemeral

    });

}