import path from "path";
import fs from "fs/promises";

import {
    Canvas,
    GlobalFonts,
    loadImage
} from "@napi-rs/canvas";

GlobalFonts.registerFromPath(
    path.resolve("src/assets/fonts/Poppins-Bold.ttf"),
    "Poppins"
);

export default async function generateWelcomeCard(member) {

    // Bigger Card
    const width = 1400;
    const height = 600;

    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background
    const background = await loadImage(
        await fs.readFile(
            path.resolve("src/data/welcome/background.png")
        )
    );

    ctx.drawImage(background, 0, 0, width, height);

    // Dark Overlay
    ctx.fillStyle = "rgba(0,0,0,0.30)";
    ctx.fillRect(0, 0, width, height);

    // Avatar
    const avatar = await loadImage(
        member.user.displayAvatarURL({
            extension: "png",
            size: 512
        })
    );

    const avatarSize = 180;
    const avatarX = width / 2 - avatarSize / 2;
    const avatarY = 70;

    ctx.save();

    ctx.beginPath();
    ctx.arc(
        width / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2,
        0,
        Math.PI * 2
    );

    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
        avatar,
        avatarX,
        avatarY,
        avatarSize,
        avatarSize
    );

    ctx.restore();

    // Border (smaller)
    ctx.beginPath();
    ctx.arc(
        width / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2 + 3
    ,0,Math.PI*2);

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";

    ctx.shadowColor = "#000";
    ctx.shadowBlur = 25;

    // Welcome
    ctx.font = "bold 72px Poppins";

    ctx.fillText(
        "WELCOME",
        width / 2,
        380
    );

    let username = member.user.username;

    if(username.length > 18)
        username = username.slice(0,18) + "...";

    // Username smaller
    ctx.font = "bold 42px Poppins";

    ctx.fillText(
        username.toUpperCase(),
        width / 2,
        450
    );

    return canvas.encode("png");

}