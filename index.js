const { Client, Collection } = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");

const {
    handleMessage,
    handleReactionAdd,
    handleInteraction,
} = require("./src/handlers/");

const intents = [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_WEBHOOKS",
];

const client = new Client({
    intents: intents,
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.commands = new Collection();

const commandFolders = fs.readdirSync("./src/commands");

for (const folder of commandFolders) {
    const command = require(`./src/commands/${folder}/${folder}.js`);
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", (message) => {
    handleMessage(message);
});

client.on("messageReactionAdd", (reaction, user) => {
    handleReactionAdd(reaction, user);
});

client.on("interactionCreate", async (interaction) => {
    handleInteraction(interaction);
});

client.login(token);
