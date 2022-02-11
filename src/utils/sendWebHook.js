const {
    TextChannel,
    MessagePayload,
    WebhookMessageOptions,
} = require("discord.js");

/**
 * @param {TextChannel} channel
 * @param {string | MessagePayload | WebhookMessageOptions} options
 */
async function sendWebHook(channel, options) {
    const webhooks = await channel.fetchWebhooks();
    let webhook = webhooks.find((wh) => wh.token);

    if (!webhook) {
        webhook = await channel.createWebhook("SerpiBot");
    }

    webhook.send(options);
}

module.exports = sendWebHook;
