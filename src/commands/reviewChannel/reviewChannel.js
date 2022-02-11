const add = require("./add");
const edit = require("./edit");
const remove = require("./remove");
const show = require("./show");

const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("review_channel")
        .setDescription("Configurar canal de revision")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("add")
                .setDescription("añadir canal de revision")
                .addChannelOption((option) =>
                    option
                        .setName("review")
                        .setDescription(
                            "Canal donde estan los memes por aprobar"
                        )
                        .setRequired(true)
                )
                .addChannelOption((option) =>
                    option
                        .setName("final")
                        .setDescription(
                            "Canal donde se publican los memes aprobados"
                        )
                        .setRequired(true)
                )
                .addRoleOption((option) =>
                    option
                        .setName("mod")
                        .setDescription("Rol con permisos para aprobar")
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("edit")
                .setDescription("editar canal de revision")
                .addChannelOption((option) =>
                    option
                        .setName("review")
                        .setDescription(
                            "Canal donde estan los memes por aprobar"
                        )
                        .setRequired(true)
                )
                .addChannelOption((option) =>
                    option
                        .setName("final")
                        .setDescription(
                            "Canal donde se publican los memes aprobados"
                        )
                        .setRequired(true)
                )
                .addRoleOption((option) =>
                    option
                        .setName("mod")
                        .setDescription("Rol con permisos para aprobar")
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("remove")
                .setDescription("quitar canal de revision")
                .addChannelOption((option) =>
                    option
                        .setName("review")
                        .setDescription(
                            "Canal donde estan los memes por aprobar"
                        )
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("show")
                .setDescription("Mostrar todos los canales de revision")
        ),
    /**
     * @param {Interaction} interaction
     */
    execute(interaction) {
        const memberPerms = interaction.channel.permissionsFor(
            interaction.member.id
        );
        const canManageMessages = memberPerms.has("MANAGE_MESSAGES");

        if (!canManageMessages) {
            interaction.reply({
                content:
                    "❌ Necesitas el permiso `MANAGE_MESSAGES` para ejecutar este comando",
                ephemeral: true,
            });
        } else if (interaction.options.getSubcommand() === "add") {
            add(interaction);
        } else if (interaction.options.getSubcommand() === "edit") {
            edit(interaction);
        } else if (interaction.options.getSubcommand() === "remove") {
            remove(interaction);
        } else if (interaction.options.getSubcommand() === "show") {
            show(interaction);
        }
    },
};
