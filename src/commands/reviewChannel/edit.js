const GuildConfig = require("../../schemas/GuildConfig");
const { findChannelConfig } = require("../../utils");
const { Interaction } = require("discord.js");

/**
 * @param {Interaction} interaction
 */
async function edit(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const reviewChannel = interaction.options.getChannel("review");
    const finalChannel = interaction.options.getChannel("final");
    const moderatorRole = interaction.options.getRole("mod");

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

    if (!(reviewChannel.isText() && finalChannel.isText())) {
        interaction.editReply("❌ Solo se aceptan canales de texto");
        return;
    }

    guildConfig.verificationChannels[index] = {
        reviewChannelId: reviewChannel.id,
        finalChannelId: finalChannel
            ? finalChannel.id
            : alreadyExists.finalChannelId,
        moderatorRoleId: moderatorRole
            ? moderatorRole.id
            : alreadyExists.moderatorRoleId,
    };

    await guildConfig.save();

    interaction.editReply("✅ Configuracion editada");
}
module.exports = edit;
