import chalk from "chalk";
import os from "os";

class Logger {

    constructor() {

        this.startTime = Date.now();

    }

    banner() {

        console.clear();

        console.log(chalk.hex("#ff8c00")(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║      ███████╗ █████╗ ███╗   ███╗██████╗     ██████╗ ███████╗██╗   ██╗        ║
║      ██╔════╝██╔══██╗████╗ ████║██╔══██╗    ██╔══██╗██╔════╝██║   ██║        ║
║      ███████╗███████║██╔████╔██║██████╔╝    ██║  ██║█████╗  ██║   ██║        ║
║      ╚════██║██╔══██║██║╚██╔╝██║██╔═══╝     ██║  ██║██╔══╝  ╚██╗ ██╔╝        ║
║      ███████║██║  ██║██║ ╚═╝ ██║██║         ██████╔╝███████╗ ╚████╔╝         ║
║      ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝         ╚═════╝ ╚══════╝  ╚═══╝          ║
║                                                                              ║
║                D I S C O R D   M A N A G E M E N T   B O T                  ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`));

        console.log(chalk.gray("──────────────────────────────────────────────────────────────────────────────"));

        console.log(`
 ${chalk.white("Developer")}            : ${chalk.cyan("Arshal")}
 ${chalk.white("Organization")}         : ${chalk.yellow("Samp DevCore")}
 ${chalk.white("Official Hosting")}     : ${chalk.magenta("Xenon Hosting")}

 ${chalk.white("Version")}              : ${chalk.green("v1.0.0")}
 ${chalk.white("Runtime")}              : ${process.version}
 ${chalk.white("Framework")}            : discord.js v14
 ${chalk.white("Database")}             : MySQL
 ${chalk.white("Platform")}             : ${os.platform()} ${os.release()}
`);

        console.log(chalk.gray("──────────────────────────────────────────────────────────────────────────────"));

    }

    info(text) {

        console.log(
            chalk.blue("[INFO]"),
            chalk.white(text)
        );

    }

    success(text) {

        console.log(
            chalk.green("[SUCCESS]"),
            chalk.white(text)
        );

    }

    warning(text) {

        console.log(
            chalk.yellow("[WARNING]"),
            chalk.white(text)
        );

    }

    error(text) {

        console.log(
            chalk.red("[ERROR]"),
            chalk.white(text)
        );

    }

    system(step, total, text) {

        console.log(
            chalk.cyan(`[${String(step).padStart(2,"0")}/${String(total).padStart(2,"0")}]`),
            chalk.white(text)
        );

    }

    summary(client) {

        const seconds =
            ((Date.now() - this.startTime) / 1000).toFixed(2);

        const memory =
            (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        console.log(chalk.gray("\n──────────────────────────────────────────────────────────────────────────────\n"));

        console.log(`
 ${chalk.white("Bot Name")}             : Samp DevCore
 ${chalk.white("Logged In As")}         : ${client.user.tag}

 ${chalk.white("Guilds")}               : ${client.guilds.cache.size}
 ${chalk.white("Users")}                : ${client.guilds.cache.reduce((a,g)=>a+g.memberCount,0)}

 ${chalk.white("Commands")}             : ${client.commands?.size || 0}
 ${chalk.white("Events")}               : ${client.eventCount || 0}

 ${chalk.white("Memory Usage")}         : ${memory} MB
 ${chalk.white("Startup Time")}         : ${seconds}s
`);

        console.log(chalk.gray("──────────────────────────────────────────────────────────────────────────────"));

        console.log(chalk.green.bold(`
                 ✓ SYSTEM INITIALIZED SUCCESSFULLY
`));

        console.log(chalk.white(`
              Made with ❤️ by Arshal | Samp DevCore
                 Official Hosting • Xenon Hosting
`));

        console.log(chalk.gray("──────────────────────────────────────────────────────────────────────────────"));

    }

}

export default new Logger();