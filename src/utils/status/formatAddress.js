import config from "../../config/config.js";

export default function formatAddress(){

    const host=config.server.ip||"Not Configured";
    const port=config.server.port||"7777";

    return `${host}:${port}`;

}