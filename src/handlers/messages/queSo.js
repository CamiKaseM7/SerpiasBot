const { Message } = require("discord.js");

/**
 * @param {Message} message
 */
function queSo(message) {
    if (endsWith(message.content, end))
        message.reply("so <:tf:902561677185277992>");
}

function endsWith(str, end) {
    str = str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^0-9a-z\s]/gi, "");

    if (!str) return false;
    str = str.split(" ").filter((e) => e);
    if (!str) return false;

    const last = str.length - 1;
    const lastWord = str[last];
    return lastWord == end;
}

module.exports = queSo;
