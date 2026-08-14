export default [

{
    id: "home",

    title: "🤖 Samp DevCore",

    color: "#5865F2",

    description:
`Professional SA-MP Management Platform

━━━━━━━━━━━━━━━━━━━━━━

⚡ Premium Discord Management
📊 Live Status Dashboard
👋 Welcome System
📨 Invite Tracker
💾 Automatic Database Backup

━━━━━━━━━━━━━━━━━━━━━━

Select a category below to view all available commands.`,

    commands: []

},

{
    id: "botinfo",

    title: "Bot Information",

    color: "#5865F2",

    description: "",

    commands: []

},

{
    id: "status",

    title: "📊 Status System",

    color: "#3BA55D",

    description:
"Manage the live SA-MP server status dashboard.",

    commands: [

        "/status setup",
        "/status refresh",
        "/status disable"

    ]

},

{
    id: "welcome",

    title: "👋 Welcome System",

    color: "#FAA61A",

    description:
"Generate premium welcome cards automatically.",

    commands: [

        "/welcome setup",
        "/welcome preview",
        "/welcome disable"

    ]

},

{
    id: "invite",

    title: "📨 Invite Tracker",

    color: "#00B0F4",

    description:
"Advanced invite tracking with detailed statistics.",

    commands: [

        "/invite setup",
        "/invite check",
        "/invite reset",
        "/invite disable"
    
    ]

},

{
    id: "backup",

    title: "💾 Database Backup",

    color: "#ED4245",

    description:
"Automatic MySQL backup and restore system.",

    commands: [

        "/backup setup",
        "/backup now",
        "/backup disable"

    ]

}

];