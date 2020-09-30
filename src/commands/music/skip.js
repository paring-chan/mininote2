const { Command } = require("discord-akairo");
const { Message } = require("discord.js");

module.exports = class Play extends Command {
    constructor() {
        super('스킵', {
            aliases: ['스킵', 'skip'],
            category: 'music'
        })
    }
    /**
     * @param {Message} msg 
     */
    async exec(msg) {
        const player = this.client.music.players.get(msg.guild.id)
        if (!player) return msg.util.reply('재생 안하고있는데요')
        if (!player.queue[0]) return msg.util.reply('스킵할 곡이 없는데 어떻게 스킵해')
        player.stop()
        return msg.util.send('스킵함')
    }
}