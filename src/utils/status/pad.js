export default function pad(text, length = 18) {
    return String(text).padEnd(length, " ");
}