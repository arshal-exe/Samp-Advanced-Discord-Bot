import refresh from "./refresh.js";
import players from "./players.js";
import details from "./details.js";

export default async function handleButton(interaction) {

    switch (interaction.customId) {

        case "status_refresh":
            return refresh(interaction);

        case "status_players":
            return players(interaction);

        case "status_details":
            return details(interaction);

    }

}