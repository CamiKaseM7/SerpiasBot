const { urlRegex } = require("./constants");

/**
 * @param {String} str
 */
function getUrls(str) {
    return str.match(urlRegex);
}

module.exports = getUrls;
