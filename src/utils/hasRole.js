const { GuildMember } = require("discord.js");

/**
 * @param {GuildMember} member
 * @param {string} roleId
 * @returns {Boolean}
 */
function hasRole(member, roleId) {
    return member.roles.cache.some((role) => role.id == roleId);
}

module.exports = hasRole;
