const crypto = require("crypto");

/**
 * @param {String} input
 */
function sha256(input) {
    const hash = crypto.createHash("sha256").update(input).digest("hex");
    return hash;
}

module.exports = sha256;
