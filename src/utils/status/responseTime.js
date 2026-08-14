export default function responseTime(server) {

    if (!server.online)
        return "--";

    return `${server.ping} ms`;

}