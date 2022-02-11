const { Message } = require("discord.js");
const addReviewReactions = require("./messages/addReviewReactions");
const queSo = require("./messages/queSo");

/**
 * @param {Message} message
 */
async function handleMessage(message) {
    const addedReactions = await addReviewReactions(message);
    if (addedReactions) return;

    const trolleado = queSo(message);
    if (trolleado) return;
}

module.exports = handleMessage;
