const GuildConfig = require("../../schemas/GuildConfig");
const { findChannelConfig } = require("../../utils");
const { Interaction } = require("discord.js");

/**
 * @param {Interaction} interaction
 */
async function remove(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const reviewChannel = interaction.options.getChannel("review");

    const guildConfig = await GuildConfig.findOne({
        guildId: interaction.guildId,
    });

    if (!guildConfig) {
        interaction.editReply(":x: No existe configuracion para ese canal");
        return;
    }

    const verificationChannels = guildConfig.verificationChannels;

    const [alreadyExists, index] = findChannelConfig(
        verificationChannels,
        reviewChannel.id
    );

    if (!alreadyExists) {
        interaction.editReply(":x: No existe configuracion para ese canal");
        return;
    }

    guildConfig.verificationChannels.splice(index, 1);

    await guildConfig.save();

    interaction.editReply("✅ Configuracion eliminada");
}
module.exports = remove;
