const { MessageEmbed, Message } = require('discord.js')

/**
 * @param {Message} msg 
 * @returns {MessageEmbed}
 */
module.exports.createEmbed = function(msg) {
    const embed = new MessageEmbed()
    embed.setFooter(msg.author.tag, msg.author.avatarURL({dynamic: true}))
    embed.setTimestamp(msg.createdTimestamp)
    return embed
}