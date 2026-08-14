export default function createSparkline(history = []) {

    const values = history
        .filter(v => typeof v === "number")
        .slice(-30);

    if (!values.length)
        return "Collecting...";

    const bars = "▁▂▃▄▅▆▇█";

    const min = Math.min(...values);
    const max = Math.max(...values);

    if (min === max)
        return "▅".repeat(values.length);

    return values.map(v => {
        const index = Math.round(
            ((v - min) / (max - min)) * (bars.length - 1)
        );

        return bars[index];
    }).join("");
}