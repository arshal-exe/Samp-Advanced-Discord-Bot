import { GameDig } from "gamedig";
import config from "../../config/config.js";

export async function queryServer() {
    try {
        const state = await GameDig.query({
            type: "gtasao",
            host: config.server.ip,
            port: config.server.port,
            maxAttempts: 1,
            socketTimeout: 3000
        });

        return {
            online: true,
            hostname: state.name,
            gamemode: state.raw.gamemode,
            language: state.raw.language,
            players: state.numplayers,
            maxPlayers: state.maxplayers,
            ping: state.ping,
            map: state.map,        };
    } catch (err) {
        console.error("SAMP Query Error:", err);

        return {
            online: false
        };
    }
}