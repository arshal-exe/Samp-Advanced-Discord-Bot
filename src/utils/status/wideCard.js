export default function wideCard(title, lines = []) {

    return {
        name: `╭─ ${title.toUpperCase()}`,
        value:
`\
\`\`\`
${lines.join("\n")}
\`\`\``,
        inline: false
    };

}