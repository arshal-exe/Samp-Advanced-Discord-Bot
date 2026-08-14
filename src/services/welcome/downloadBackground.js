import fs from "fs";
import path from "path";
import axios from "axios";

export default async function downloadBackground(url) {

    const response = await axios({
        url,
        method: "GET",
        responseType: "stream"
    });

    const type = response.headers["content-type"];

    if (!type || !type.startsWith("image/")) {
        throw new Error("Invalid image.");
    }

    const file = path.resolve(
        "src/data/welcome/background.png"
    );

    await new Promise((resolve, reject) => {

        const writer = fs.createWriteStream(file);

        response.data.pipe(writer);

        writer.on("finish", resolve);
        writer.on("error", reject);

    });

    return file;

}