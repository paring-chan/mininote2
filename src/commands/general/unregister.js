const { Command } = require("discord-akairo");
const { Message } = require("discord.js");
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");

module.exports = class Register extends Command {
    constructor() {
        super('탈퇴', {
            aliases: ['탈퇴', 'unregister']
        })
    }

    /**
     * @param {Message} msg 
     */
    async exec(msg) {
        if (!(await db('users').where('id', msg.author.id))[0]) return msg.util.send('가입 안했잖아요')
        const embed = createEmbed(msg)
        embed.setTitle('미니노트 서비스 탈퇴')
        embed.setDescription([
            '탈퇴하면 데이터베이스에서 유저 정보를 모두 삭제합니다(경고 등 서버에서 사용하는 기능 제외)',
            '탈퇴하려면 반응을 눌러주세요'
        ].join('\n'))
        const m = await msg.util.send(embed)
        await m.react('✔')
        const collected = await m.awaitReactions((r, u) => r.emoji.name === '✔' && u.id === msg.author.id, {
            max: 1,
            time: 30000
        })
        if (collected.size === 0) return msg.util.send('취소되었습니다(시간초과)')
        await db('users').delete().where('id', msg.author.id)
        await msg.util.send('가입이 완료되었습니다.')
    }
}
