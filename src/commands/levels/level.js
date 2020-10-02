const { Command } = require("discord-akairo");
const { Message } = require("discord.js");
const Canvas = require('canvas');
const { MessageAttachment } = require("discord.js");
const path = require('path');
const db = require("../../util/db");

module.exports = class Play extends Command {
    constructor() {
        super('레벨', {
            aliases: ['level', '레벨'],
            category: 'levels',
            args: [
                {
                    type: 'user',
                    id: 'user',
                    default: 'me'
                }
            ]
        })
    }
    /**
     * @param {Message} msg 
     */
    async exec(msg, args) {
        const u = args.user === 'me' ? msg.author : args.user
        const user = (await db('users').where('id', u.id))[0]
        const rank = await db('users').orderBy('xp', 'desc')
        if (!user) return msg.util.reply('가입한 사람이 아닌데요')
        Canvas.registerFont(path.join(path.resolve('.'), 'fonts', 'JetBrainsMono-ExtraBold.ttf'), { family: 'JetBrainsMono ExtraBold' })
        Canvas.registerFont(path.join(path.resolve('.'), 'fonts', 'NotoSansCJKkr-Black.otf'), { family: 'NotoSans CJK KR Black' })
        const canvas = Canvas.createCanvas(500, 220)
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#000'
        ctx.fillRect(0,0,canvas.width,canvas.height)
        const avatar = await Canvas.loadImage(u.avatarURL({format: 'png', size: 4096}))
        ctx.drawImage(avatar, 10,10,200,200)
        ctx.fillStyle = '#fff'
        ctx.font = '30px JetBrainsMono ExtraBold, NotoSans CJK KR Black'
        ctx.fillText(u.tag, 230,45)
        ctx.fillText(`레벨: ${user.level}`, 230,95)
        ctx.fillText(`XP: ${user.xp}`, 230,145)
        ctx.fillText(`랭크(전체): ${rank.findIndex(r => r.id === u.id)+1}`, 230,195)
        const attach = new MessageAttachment(canvas.toBuffer())
        await msg.util.send(attach)
    }
}