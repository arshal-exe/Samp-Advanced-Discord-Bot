let cache = {

    online: false,
    hostname: "",
    players: 0,
    maxPlayers: 0,
    ping: 0,
    gamemode: "",
    language: "",
    map: "",
    playerList: [],
    updatedAt: null

};

export function getCache() {
    return cache;
}

export function updateCache(data) {

    cache = {
        ...cache,
        ...data,
        updatedAt: Date.now()
    };

}