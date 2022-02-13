/**
 * @param {String} url
 */
function getDomain(url) {
    return url
        .split("?")[0]
        .split("#")[0]
        .replace("http://", "")
        .replace("https://", "")
        .split("/")[0]
        .toLowerCase();
}

module.exports = getDomain;
