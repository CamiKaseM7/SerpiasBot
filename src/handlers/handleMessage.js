const { Message } = require("discord.js");
const addReviewReactions = require("./messages/addReviewReactions");
const detectScam = require("./messages/detectScam");
const queSo = require("./messages/queSo");

/**
 * @param {Message} message
 */
async function handleMessage(message) {
    const isScam = await detectScam(message);
    if (isScam) return;

    const addedReactions = await addReviewReactions(message);
    if (addedReactions) return;

    const trolleado = queSo(message);
    if (trolleado) return;
}

module.exports = handleMessage;
