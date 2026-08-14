export default function card(title, lines = []) {

    return {
        name: `╭─ ${title.toUpperCase()}`,
        value:
`\
\`\`\`fix
${lines.join("\n")}
\`\`\``,
        inline: true
    };

}