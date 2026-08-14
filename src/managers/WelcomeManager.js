import fs from "fs/promises";
import path from "path";

class WelcomeManager {

    constructor() {

        this.file = path.resolve("src/data/welcome/config.json");
        this.data = null;

    }

    async init() {

        this.data = JSON.parse(
            await fs.readFile(this.file, "utf8")
        );

    }

    async save() {

        await fs.writeFile(
            this.file,
            JSON.stringify(this.data, null, 4)
        );

    }

    isEnabled() {

        return this.data?.enabled === true;

    }

}

export default new WelcomeManager();