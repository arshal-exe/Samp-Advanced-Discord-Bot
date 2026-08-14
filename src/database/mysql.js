import mysql from "mysql2/promise";
import config from "../config/config.js";
import logger from "../utils/logger.js";

let pool = null;

export async function connectDatabase() {
    try {

        pool = mysql.createPool({
            host: config.mysql.host,
            port: config.mysql.port,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database,

            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });

        const connection = await pool.getConnection();
        connection.release();

        logger.system(1,12,"Connecting MySQL...");
        logger.success("MySQL database connected.");

    } catch (error) {

        logger.error(`MySQL Connection Failed: ${error.message}`);
        process.exit(1);

    }
}

export function getDatabase() {

    if (!pool)
        throw new Error("Database has not been initialized.");

    return pool;

}