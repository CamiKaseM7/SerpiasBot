const GuildConfig = require("../../schemas/GuildConfig");
const { findChannelConfig } = require("../../utils");
const { Interaction } = require("discord.js");

/**
 * @param {Interaction} interaction
 */
async function add(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const reviewChannel = interaction.options.getChannel("review");
    const finalChannel = interaction.options.getChannel("final");
    const moderatorRole = interaction.options.getRole("mod");

    let guildConfig = await GuildConfig.findOne({
        guildId: interaction.guildId,
    });

    if (!guildConfig)
        guildConfig = await GuildConfig.create({
            guildId: interaction.guildId,
        });

    const verificationChannels = guildConfig.verificationChannels;

    const [alreadyExists] = findChannelConfig(
        verificationChannels,
        reviewChannel.id
    );

    if (alreadyExists) {
        interaction.editReply(":x: Ya existe una configuracion para ese canal");
        return;
    }

    if (!(reviewChannel.isText() && finalChannel.isText())) {
        interaction.editReply("❌ Solo se aceptan canales de texto");
        return;
    }

    const data = {
        reviewChannelId: reviewChannel.id,
        finalChannelId: finalChannel.id,
        moderatorRoleId: moderatorRole ? moderatorRole.id : null,
    };

    guildConfig.verificationChannels.push(data);
    await guildConfig.save();

    interaction.editReply("✅ Configuracion agregada");
}
module.exports = add;
