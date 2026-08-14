export default function score(server) {

    if (!server.online)
        return 0;

    let score = 100;

    if (server.ping > 120)
        score -= 10;

    if (server.ping > 180)
        score -= 15;

    if (server.ping > 250)
        score -= 20;

    const load = (server.players / server.maxPlayers) * 100;

    if (load > 95)
        score -= 10;

    return Math.max(score, 0);

}