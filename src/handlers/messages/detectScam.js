const { Message, MessageEmbed } = require("discord.js");
const {
    getUrls,
    indexBinarySearch,
    sha256,
    getDomain,
} = require("../../utils");
const { discordBadDomainsURL } = require("../../utils/constants");
const fetch = require("node-fetch");
const GuildConfig = require("../../schemas/GuildConfig");

/**
 * @param {Message} message
 */
async function detectScam(message) {
    const urls = getUrls(message.content);
    if (!(urls && urls.length)) return false;
    const requets = await fetch(discordBadDomainsURL);
    const discordBadDomains = await requets.json();

    for (const url of urls) {
        const domain = getDomain(url);
        const hash = sha256(domain);
        const badDomainIndex = indexBinarySearch(hash, discordBadDomains);

        if (badDomainIndex > -1) {
            message.delete().catch((err) => console.log(err.message));
            debugger;
            const guildConfig = await GuildConfig.findOne({
                guildId: message.guildId,
            });
            
            if (!guildConfig) return false;

            if (!guildConfig.antiphishing?.enabled) return false;
            
            const mutedRoleId = guildConfig.antiphishing?.mutedRoleId;
            if (mutedRoleId) {
                message.member.roles
                    .add(mutedRoleId)
                    .catch((err) => console.log(err.message));
            }

            const ebd = new MessageEmbed()
                .setTitle("Cuidado!")
                .setDescription(`\`${domain}\` **es una pagina maliciosa**`)
                .setColor("RED")
                .addField(
                    "**Autor:**",
                    `<@${message.author.id}> (${message.author.id})`
                );
            message.channel.send({ embeds: [ebd] });

            return true;
        }
    }

    return false;
}

module.exports = detectScam;
