const mongoose = require("mongoose");

const channelVerificationShema = new mongoose.Schema({
    moderatorRoleId: { type: String },
    reviewChannelId: {
        type: String,
        required: true,
        unique: true,
    },
    finalChannelId: {
        type: String,
        required: true,
    },
});

const guildConfigSchema = new mongoose.Schema({
    guildId: {
        type: String,
        unique: true,
        required: true,
    },

    verificationChannels: {
        type: [channelVerificationShema],
        default: [],
        required: false,
    },
});

module.exports = mongoose.model("GuildConfig", guildConfigSchema);
