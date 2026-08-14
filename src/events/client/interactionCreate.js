import handleButton from "../../interactions/buttons/index.js";
import handleHelpSelect from "../../interactions/help/select.js";

export default {

    name: "interactionCreate",

    async execute(interaction, client) {

        if (interaction.isButton()) {
            return handleButton(interaction);
        }

        if (interaction.isStringSelectMenu()) {
            return handleHelpSelect(interaction);
        }

        if (!interaction.isChatInputCommand())
            return;

        const command = client.commands.get(interaction.commandName);
        console.log(
            interaction.commandName,
            interaction.options.data
        );

        if (!command)
            return;

        try {

            await command.execute(interaction);

        } catch (err) {

            console.error(err);

            if (interaction.replied || interaction.deferred)

                await interaction.followUp({
                    content: "An error occurred.",
                    ephemeral: true
                });

            else

                await interaction.reply({
                    content: "An error occurred.",
                    ephemeral: true
                });

        }

    }

};