import categories from "../../help/categories.js";

import buildHelpEmbed from "../../help/embedBuilder.js";

import buildComponents from "../../help/components.js";

export default async function(interaction){

    if(interaction.customId !== "help-category")
        return;

    const category = categories.find(

        c => c.id === interaction.values[0]

    );

    if(!category)
        return;

    await interaction.update({

        embeds:[
            buildHelpEmbed(
                category,
                interaction.client,
                categories
            )
        ],

        components:[
            ...buildComponents(categories)
        ]

    });

}