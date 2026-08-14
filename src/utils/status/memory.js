export default function memoryUsage() {

    const used = process.memoryUsage().rss / 1024 / 1024;

    return `${used.toFixed(1)} MB`;

}