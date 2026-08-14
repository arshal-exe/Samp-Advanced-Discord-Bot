import { MessageFlags } from "discord.js";
import InviteManager from "../managers/InviteManager.js";

export default async function reset(interaction) {

    const user = interaction.options.getUser("user");

    InviteManager.resetInvites(user.id);

    await InviteManager.saveUsers();

    return interaction.reply({

        content:
`✅ Reset invites for ${user}`,

        flags: MessageFlags.Ephemeral

    });

}