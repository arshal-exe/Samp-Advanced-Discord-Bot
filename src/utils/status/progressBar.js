export default function progressBar(current, max, size = 12) {

    if (!max) return "░░░".repeat(size);

    const percent = Math.max(0, Math.min(1, current / max));

    const full = Math.floor(percent * size);

    return "███".repeat(full) + "░░░".repeat(size - full);

}