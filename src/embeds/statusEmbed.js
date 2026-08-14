import { EmbedBuilder } from "discord.js";
import config from "../config/config.js";

import StatisticsManager from "../statistics/StatisticsManager.js";

import createSparkline from "../utils/status/sparkline.js";
import formatUptime from "../utils/formatUptime.js";

import progressBar from "../utils/status/progressBar.js";;

import card from "../utils/status/card.js";
import wideCard from "../utils/status/wideCard.js";

import serverLoad from "../utils/status/serverLoad.js";

import memoryUsage from "../utils/status/memory.js";
import responseTime from "../utils/status/responseTime.js";
import score from "../utils/status/score.js";

export default function createStatusEmbed(server, guild) {

    const stats = StatisticsManager.getStats();

    const history = StatisticsManager.getHistory().slice(-30);

    const graph = createSparkline(history);

    const color = server.online ? 0x57F287 : 0xED4245;

    return new EmbedBuilder()

        .setColor(color)
        .setAuthor({
        name: server.online
            ? "🟢 LIVE SERVER MONITOR"
            : "🔴 SERVER OFFLINE",
            iconURL: guild.iconURL() || undefined
        })
        .setTitle(server.hostname || config.server.name)
        
        .setDescription(
        "> Real-time monitoring powered by **Samp DevCore**."
        )
        .addFields(

            card("Status",[
                server.online
                ?"ONLINE"
                :"OFFLINE"
            ]),

            card("Players",[
                `${server.players}/${server.maxPlayers}`
            ]),

            card("Latency",[
                `${server.ping} ms`
            ]),

            card("Peak",[
                `${stats.players.peak}`
            ]),

            card("Today",[
                `${stats.daily.averagePlayers}`
            ]),

            card("Health",[
                `${score(server)}/100`
            ]),

            wideCard(
                "Player Activity",
                [
                    graph
                ]
            ),

            wideCard(
                "Server Load",
                [
                    progressBar(server.players, server.maxPlayers),
                    `${serverLoad(server.players, server.maxPlayers)}% Capacity`
                ]
            ),

            card("Connection",[
                `${config.server.ip}:${config.server.port}`
            ]),

            card("Gamemode",[
                server.gamemode
            ]),

            card("Uptime",[
                formatUptime(process.uptime())
            ]),

            wideCard(
                "System",
                [
                    `Memory     ${memoryUsage()}`,
                    `Response   ${responseTime(server)}`,
                    `Health     ${score(server)}/100`
                ]
            ),
        )

        .setFooter({
            text:"Powered by Xenon Hosting"
        })

        .setTimestamp();

}