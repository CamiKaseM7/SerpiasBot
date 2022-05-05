const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction } = require("discord.js");
const GuildConfig = require("../../schemas/GuildConfig");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("antiphishing")
        .setDescription("Configurar el sistema anti-phishing")
        .addBooleanOption((option) =>
            option
                .setName("enabled")
                .setDescription("Activar o desactivar modulo")
        )
        .addRoleOption((option) =>
            option
                .setName("muted")
                .setDescription("Rol a otorgar a las cuentas comprometidas")
        ),
    /**
     * @param {Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const enabled = interaction.options.getBoolean("enabled");
        const mutedRole = interaction.options.getRole("muted");

        let guildConfig = await GuildConfig.findOne({
            guildId: interaction.guildId,
        });

        if (!guildConfig)
            guildConfig = await GuildConfig.create({
                guildId: interaction.guildId,
            });

        if (mutedRole.managed) {
            interaction.editReply(
                "❌ Rol invalido, es un rol especial controlado por un servicio externo"
            );
            return;
        }

        const canBotManageRole =
            interaction.guild.me.roles.highest.comparePositionTo(mutedRole) <=
            0;

        if (canBotManageRole) {
            interaction.editReply(
                "❌ Rol invalido, no tengo dereches sobre ese rol. Debo tener un rol arriba de ese en la lista de roles"
            );
            return;
        }

        guildConfig.phishing = {
            enabled: enabled || guildConfig.phishing.enabled || false,
            mutedRoleId:
                mutedRole.id || guildConfig.phishing.mutedRoleId || null,
        };

        await guildConfig.save();

        await interaction.editReply("✅ Configuracion agregada");
    },
    requiredPermissions: ["MANAGE_MESSAGES", "MANAGE_ROLES"],
};