const GuildConfig = require("../schemas/GuildConfig");
const mongoose = require("mongoose");
const { sendWebHook, findChannelConfig, hasRole } = require("../utils");
const { MessageReaction, PartialMessageReaction, User } = require("discord.js");

mongoose.connect("mongodb://localhost/Test");

/**
 * @param {MessageReaction | PartialMessageReaction} reaction
 * @param {User | PartialUser} user
 */
async function handleReactionAdd(reaction, user) {
    if (user.bot) return;

    const channel = reaction.message.channel;
    const message = await channel.messages.fetch(reaction.message.id);
    const guild = message.guild;
    const member = await guild.members.fetch(user.id);

    const guildConfig = await GuildConfig.findOne({
        guildId: message.guildId,
    });

    if (!guildConfig) return;

    const verificationChannels = guildConfig.verificationChannels;

    const [channelConfig] = findChannelConfig(verificationChannels, channel.id);
    if (!channelConfig) return;

    const { moderatorRoleId, finalChannelId } = channelConfig;

    const memberPerms = channel.permissionsFor(member.id);
    const canManageMessages = memberPerms.has("MANAGE_MESSAGES");
    const hasModeratorRole = moderatorRoleId
        ? hasRole(member, moderatorRoleId)
        : false;

    const authorized = canManageMessages || hasModeratorRole;
    if (!authorized) return;

    if (reaction.emoji.name == "🔴") {
        reaction.message.delete().catch((err) => {
            console.log(err.message);
        });
        return;
    }
    if (!reaction.emoji.name == "🟢") return;

    reaction.message.delete().catch((err) => {
        console.log(err.message);
    });

    const endChannel = await guild.channels.fetch(finalChannelId);
    if (!endChannel) return;

    const content = `\n${message.content.replaceAll("@", "@ ")}`;
    const files = message.attachments.map((attachment) => {
        return attachment.attachment;
    });

    const author = message.author;

    sendWebHook(endChannel, {
        username: author.username,
        avatarURL: author.avatarURL(),
        content: content,
        files: files,
    }).catch((err) => console.log(err.message));
}

module.exports = handleReactionAdd;
