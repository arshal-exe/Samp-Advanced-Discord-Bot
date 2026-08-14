import {
    Events,
    AttachmentBuilder
} from "discord.js";

import WelcomeManager from "../../managers/WelcomeManager.js";
import generateWelcomeCard from "../../services/welcome/canvas.js";

export default {

    name: Events.GuildMemberAdd,

    once: false,

    async execute(member) {

        try {

            if (!WelcomeManager.isEnabled())
                return;

            if (member.guild.id !== WelcomeManager.data.guildId)
                return;

            const channel = member.guild.channels.cache.get(
                WelcomeManager.data.channelId
            );

            if (!channel)
                return;

            const image = await generateWelcomeCard(member);

            const attachment = new AttachmentBuilder(image, {
                name: "welcome.png"
            });

            await channel.send({

                content:
`👋 Welcome ${member} to **${member.guild.name}**!`,

                files: [attachment]

            });

        } catch (err) {

            console.error("[WELCOME]", err);

        }

    }

};