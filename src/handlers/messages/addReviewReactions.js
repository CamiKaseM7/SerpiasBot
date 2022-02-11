const { Message } = require("discord.js");
const GuildConfig = require("../../schemas/GuildConfig");
const { findChannelConfig } = require("../../utils");

/**
 * @param {Message} message
 */
async function addReviewReactions(message) {
    if (message.author.bot) return false;
    const guildConfig = await GuildConfig.findOne({
        guildId: message.guildId,
    });

    if (!guildConfig) return false;

    const verificationChannels = guildConfig.verificationChannels;

    const [channelConfig] = findChannelConfig(
        verificationChannels,
        message.channelId
    );
    if (!channelConfig) return false;

    if (channelConfig) {
        message.react("🟢").catch((err) => console.log(err.message));
        message.react("🔴").catch((err) => console.log(err.message));
    }

    return true;
}

module.exports = addReviewReactions;
