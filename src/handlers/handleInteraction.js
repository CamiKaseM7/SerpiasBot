const { Interaction } = require("discord.js");

/**
 * @param {Interaction} interaction
 */

async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return;

    const client = interaction.client;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
}

module.exports = handleInteraction;
