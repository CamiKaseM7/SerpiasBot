/**
 * @typedef {Object} ChannelConfig
 * @property {string} reviewChannelId
 * @property {string} finalChannelId
 * @property {?string} moderatorRoleId
 */

/**
 * @param {[ChannelConfig]} channels
 * @param {string} channelId
 * @returns {[ChannelConfig | undefined, int]}
 */
function findChannelConfig(channels, channelId) {
    for (let i = 0; i < channels.length; i++) {
        if (channels[i].reviewChannelId == channelId) {
            return [channels[i], i];
        }
    }
    return [undefined, -1];
}

module.exports = findChannelConfig;
