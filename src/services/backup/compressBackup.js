import fs from "fs";
import zlib from "zlib";

export default function compressBackup(file) {

    return new Promise((resolve, reject) => {

        const gzipFile = `${file}.gz`;

        const source = fs.createReadStream(file);

        const destination = fs.createWriteStream(gzipFile);

        const gzip = zlib.createGzip({

            level: 9

        });

        source
            .pipe(gzip)
            .pipe(destination)
            .on("finish", () => resolve(gzipFile))
            .on("error", reject);

    });

}