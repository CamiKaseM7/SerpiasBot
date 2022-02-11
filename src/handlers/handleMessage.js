const { Message } = require("discord.js");
const GuildConfig = require("../schemas/GuildConfig");
const { findChannelConfig } = require("../utils");

/**
 * @param {Message} message
 */
async function handleMessage(message) {
    if (message.author.bot) return;
    const guildConfig = await GuildConfig.findOne({
        guildId: message.guildId,
    });

    if (!guildConfig) return;

    const verificationChannels = guildConfig.verificationChannels;

    const [channelConfig] = findChannelConfig(
        verificationChannels,
        message.channelId
    );
    if (!channelConfig) return;

    if (channelConfig) {
        message.react("🟢").catch((err) => console.log(err.message));
        message.react("🔴").catch((err) => console.log(err.message));
    }
}

module.exports = handleMessage;
