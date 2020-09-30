const { Command } = require("discord-akairo");
const { Message } = require("discord.js");
const { reject } = require("lodash");
const { client } = require("../../util/db");
const { createEmbed } = require("../../util/Embed");
const pagination = require("../../util/pagination");

module.exports = class Play extends Command {
    constructor() {
        super('반복', {
            aliases: ['loop', '반복'],
            category: 'music'
        })
    }
    /**
     * @param {Message} msg 
     */
    async exec(msg) {
        const player = this.client.music.players.get(msg.guild.id)
        if (!player) return msg.util.reply('재생 안하고있는데요')
        let m = ''
        if (player.trackRepeat) {
            player.setTrackRepeat(false)
            player.setQueueRepeat(true)
            m = '반복이 `대기열 반복`으로 설정되었습니다.'
        } else if (player.queueRepeat) {
            player.setTrackRepeat(false)
            player.setQueueRepeat(false)
            m = '반복이 `비활성화` 되었습니다.'
        } else {
            player.setTrackRepeat(true)
            player.setQueueRepeat(false)
            m = '반복이 `곡 반복` 으로 설정되었습니다.'
        }
        await msg.util.send(m)
    }
}