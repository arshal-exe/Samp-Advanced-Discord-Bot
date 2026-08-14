import dotenv from "dotenv";

dotenv.config();

export default {

    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,

    bot: {
        name: "Samp DevCore",
        version: "1.0.0",
        ownerId: "1135547753771049050",
        developers: [
            {
                id: "1135547753771049050",
                name: "Arshal",
                role: "Lead Developer"
            }
        ]
    },

    server: {
        name: "",
        ip: "",
        port: 
    },

    website: process.env.WEBSITE || "https://arshal-exe.github.io/arshal",

    mysql: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT
    }

};