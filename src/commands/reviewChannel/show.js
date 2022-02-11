const GuildConfig = require("../../schemas/GuildConfig");
const { Interaction, MessageEmbed } = require("discord.js");

/**
 * @param {Interaction} interaction
 */
async function edit(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const guildConfig = await GuildConfig.findOne({
        guildId: interaction.guildId,
    });

    if (!guildConfig) {
        interaction.editReply(":x: No existe configuracion para ese servidor");
        return;
    }

    const verificationChannels = guildConfig.verificationChannels;

    if (verificationChannels.length == 0) {
        interaction.editReply(":x: No existe configuracion para ese servidor");
        return;
    }

    const ebd = new MessageEmbed()
        .setTitle("Canales de revision")
        .setColor(interaction.member.displayHexColor || "#10FFF6");

    verificationChannels.forEach((channel, idx) => {
        let value = `**Review**: <#${channel.reviewChannelId}>\n**Final**: <#${channel.finalChannelId}>`;
        value = channel.moderatorRoleId
            ? value + `\n**Mod**: <@&${channel.moderatorRoleId}>`
            : value;

        ebd.addField(`${idx + 1}`, value, true);
    });
    interaction.editReply({ embeds: [ebd] });
}
module.exports = edit;
