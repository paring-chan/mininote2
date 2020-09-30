const { Command, CommandHandler, Argument } = require("discord-akairo");
const { Message } = require('discord.js');
const Discord = require('discord.js')

module.exports = class MakePIC extends Command {
    constructor() {
        super('프사만들기', {
            aliases: ['프사만들기', 'makepic'],
            category: 'util',
            args: [
                {
                    id: 'size',
                    prompt: {
                        start: '폰트 크기 입력하삼(1-500)',
                        cancel: '취소됨',
                        cancelWord: '취소'
                    },
                    type: Argument.range('integer', 1, 501)
                },
                {
                    id: 'content',
                    prompt: {
                        start: '내용 입력하삼',
                        cancel: '취소됨',
                        cancelWord: '취소'
                    },
                    match: 'rest'
                }
            ]
        })
    }

    /**
     * @param {Message} msg 
     */
    async exec(msg, { size, content }) {
        const path = require('path')

        require('canvas').registerFont(path.join(path.resolve('.'), 'fonts', 'JetBrainsMono-ExtraBold.ttf'), { family: 'JetBrainsMono ExtraBold' })

        const canvas = require('canvas').createCanvas(1000, 1000)

        const ctx = canvas.getContext('2d')

        ctx.fillStyle = 'grey'

        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.textAlign = 'center'

        ctx.textBaseline = "middle"

        ctx.fillStyle = 'white'

        ctx.font = size + 'px JetBrainsMono ExtraBold'

        ctx.fillText(content, canvas.width / 2, canvas.height / 2)

        const attach = new Discord.MessageAttachment(canvas.toBuffer(), 'asdf.png')

        msg.util.send(attach)
    }
}