import {

    ActionRowBuilder,

    StringSelectMenuBuilder

} from "discord.js";

export default function buildComponents(categories) {

    return [

        new ActionRowBuilder()

            .addComponents(

                new StringSelectMenuBuilder()

                    .setCustomId("help-category")

                    .setPlaceholder("Select a Help Category")

                    .addOptions(
                        categories.map(cat => ({
                            label: cat.title.replace(/^[^\s]+\s/, ""),
                            value: cat.id,
                            description:
                                cat.id === "home"
                                    ? "Main help page"

                                : cat.id === "botinfo"
                                    ? "Bot information"

                                : cat.id === "status"
                                    ? "Status commands"

                                : cat.id === "welcome"
                                    ? "Welcome commands"

                                : cat.id === "invite"
                                    ? "Invite commands"

                                : "Backup commands"
                        }
                    ))

                )

            )

    ];

}