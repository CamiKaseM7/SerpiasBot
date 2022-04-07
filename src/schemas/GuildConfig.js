const mongoose = require("mongoose");

const channelVerificationShema = new mongoose.Schema({
    moderatorRoleId: {
        type: String,
        required: false,
    },
    reviewChannelId: {
        type: String,
        required: true,
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
    phishing: {
        mutedRoleId: {
            type: String,
            required: false,
        },

        enabled: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
});

module.exports = mongoose.model("GuildConfig", guildConfigSchema);
