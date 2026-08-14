import { SlashCommandBuilder } from "discord.js";

import categories from "../../help/categories.js";
import buildHelpEmbed from "../../help/embedBuilder.js";
import buildComponents from "../../help/components.js";

export default {

    data: new SlashCommandBuilder()

        .setName("help")

        .setDescription("View all bot commands"),

    async execute(interaction) {

        await interaction.reply({

            embeds: [

                buildHelpEmbed(

                    categories[0],

                    interaction.client,

                    categories

                )

            ],

            components: [

                ...buildComponents(categories)

            ]

        });

    }

};