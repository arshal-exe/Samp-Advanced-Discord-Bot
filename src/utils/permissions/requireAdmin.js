import {
    PermissionFlagsBits,
    MessageFlags
} from "discord.js";

export default async function requireAdmin(interaction) {

    if (
        interaction.member.permissions.has(
            PermissionFlagsBits.Administrator
        )
    ) {
        return true;
    }

    await interaction.reply({
        content: "You must have the **Administrator** permission to use this command.",
        flags: MessageFlags.Ephemeral
    });

    return false;
}