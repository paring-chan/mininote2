const { Command } = require("discord-akairo");
const { Message } = require("discord.js");
const { createEmbed } = require("../../util/Embed");
const pagination = require("../../util/pagination");

module.exports = class Play extends Command {
    constructor() {
        super('대기열', {
            aliases: ['대기열', 'queue'],
            category: 'music'
        })
    }
    /**
     * @param {Message} msg 
     */
    async exec(msg) {
        const player = this.client.music.players.get(msg.guild.id)
        if (!player) return msg.util.reply('재생 안하고있는데요')
        const embed = createEmbed(msg).setTitle('대기열')
        await pagination(msg, async () => player.queue.map((r,i) => `${i+1}. [${r.title}](${r.uri})`), 10, embed)
    }
}