import { MessageFlags } from "discord.js";
import InviteManager from "../managers/InviteManager.js";

export default async function disable(interaction) {

    await InviteManager.disable();

    return interaction.reply({

        content:
"✅ Invite tracker disabled.",

        flags: MessageFlags.Ephemeral

    });

}