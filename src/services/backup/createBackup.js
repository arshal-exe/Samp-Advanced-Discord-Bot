import mysqldump from "mysqldump";
import path from "path";
import fs from "fs/promises";

import config from "../../config/config.js";

import compressBackup from "./compressBackup.js";
import sendBackup from "./sendBackup.js";

export default async function createBackup(client, requestedBy = null) {

    const now = new Date();

    const pad = value => value.toString().padStart(2, "0");

    const filename =
`${config.mysql.database}_${now.getFullYear()}-${
pad(now.getMonth() + 1)}-${
pad(now.getDate())}_${
pad(now.getHours())}-${
pad(now.getMinutes())}-${
pad(now.getSeconds())}`;

    const sqlFile = path.resolve(
        "src/temp",
        `${filename}.sql`
    );

    let gzipFile = null;

    try {

        console.log("[BACKUP] Creating database dump...");

        await mysqldump({

            connection: {

                host: config.mysql.host,
                port: config.mysql.port,
                user: config.mysql.user,
                password: config.mysql.password,
                database: config.mysql.database

            },

            dumpToFile: sqlFile

        });

        console.log("[BACKUP] Database exported.");

        gzipFile = await compressBackup(sqlFile);

        await sendBackup(
            client,
            gzipFile,
            filename,
            requestedBy
        );

        await fs.unlink(sqlFile).catch(() => {});
        await fs.unlink(gzipFile).catch(() => {});

        console.log("[BACKUP] Finished.");

    } catch (err) {

        console.error("[BACKUP]", err);

        await fs.unlink(sqlFile).catch(() => {});
        if (gzipFile)
            await fs.unlink(gzipFile).catch(() => {});


    }

}