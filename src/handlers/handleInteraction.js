const { Interaction } = require("discord.js");

/**
 * @param {Interaction} interaction
 */

async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return;

    const client = interaction.client;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    const requiredPermissions = command.requiredPermissions;

    const memberPerms = interaction.channel.permissionsFor(
        interaction.member.id
    );

    for (const permission of requiredPermissions) {
        if (!memberPerms.has(permission)) {
            return interaction.reply({
                content: `❌ Necesitas el permiso \`${permission}\` para ejecutar este comando`,
                ephemeral: true,
            });
        }
    }

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
