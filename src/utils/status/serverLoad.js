export default function serverLoad(players, maxPlayers) {

    if (!maxPlayers)
        return 0;

    return Math.round((players / maxPlayers) * 100);

}