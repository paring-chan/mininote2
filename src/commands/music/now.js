const { Command } = require("discord-akairo");
const { Message } = require("discord.js");
const { createEmbed } = require("../../util/Embed");
const {formatDuration} = require("../../util/duration")

module.exports = class Play extends Command {
    constructor() {
        super('현재곡', {
            aliases: ['현재곡', 'now', 'np'],
            category: 'music'
        })
    }
    /**
     * @param {Message} msg 
     */
    async exec(msg) {
        const player = this.client.music.players.get(msg.guild.id)
        if (!player || !player.queue.current) return msg.util.reply('재생 안하고있는데요')
        const now = player.queue.current
        const embed = createEmbed(msg)
        embed.addField('제목', `[${now.title}](${now.uri})`,true)
        embed.addField('신청', now.requester.tag,true)
        embed.addField('길이(?)', `${formatDuration(player.position)}/${formatDuration(now.duration)}`,true)
        embed.setImage(now.displayThumbnail('maxresdefault'))
        await msg.util.send(embed)
    }
}