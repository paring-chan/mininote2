const { Command } = require("discord-akairo");
const { Message } = require("discord.js");
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");

module.exports = class Register extends Command {
    constructor() {
        super('가입', {
            aliases: ['가입', 'register']
        })
    }

    /**
     * @param {Message} msg 
     */
    async exec(msg) {
        if ((await db('users').where('id', msg.author.id))[0]) return msg.util.send('이미 가입했잖아요')
        const embed = createEmbed(msg)
        embed.setTitle('미니노트 서비스 가입')
        embed.setDescription([
            '가입하면 봇에(?) 유저 정보가 저장됩니다',
            '가입하려면 반응을 눌러주세요'
        ].join('\n'))
        const m = await msg.util.send(embed)
        await m.react('✔')
        const collected = await m.awaitReactions((r, u) => r.emoji.name === '✔' && u.id === msg.author.id, {
            max: 1,
            time: 30000
        })
        if (collected.size === 0) return msg.util.send('취소되었습니다(시간초과)')
        await db('users').insert({id: msg.author.id})
        await msg.util.send('가입이 완료되었습니다.')
    }
}
