import fs from "fs/promises";
import path from "path";
import { MessageFlags } from "discord.js";

import WelcomeManager from "../managers/WelcomeManager.js";

export default async function disable(interaction) {

    try {

        const background = path.resolve(
            "src/data/welcome/background.png"
        );

        await fs.rm(background, {
            force: true
        });

        WelcomeManager.data = {

            enabled: false,
            guildId: null,
            channelId: null,
            background: null

        };

        await WelcomeManager.save();

        return interaction.reply({

            content:
"✅ Welcome system disabled successfully.",

            flags: MessageFlags.Ephemeral

        });

    } catch (err) {

        console.error(err);

        return interaction.reply({

            content:
"Failed to disable the welcome system.",

            flags: MessageFlags.Ephemeral

        });

    }

}