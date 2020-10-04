const { Command, CommandHandler } = require("discord-akairo");
const { Message } = require('discord.js');
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");

module.exports = class Help extends Command {
    constructor() {
        super('잊어', {
            aliases: ['잊어'],
            args: [
                {
                    id: 'question',
                    default: '내용 입력하삼(띄어쓰기 안됨)',
                    type: 'string'
                }
            ]
        })
    }

    /**
     * @param {Message} msg
     * @param {{command: string}}
     */
    async exec(msg, {question}) {
        const data = (await db('chat').where('question', question.replace(' ', '')))[0]
        if (!data) return msg.util.send('그런거 모르는데요')
        if (data.id !== msg.author.id) return msg.util.send('님이 알려준거 아닌데요')
        await db('chat').delete().where('question', question)
        await msg.util.send(`갑자기 \`${data.question}\` 이 생각이 안나요...`)
    }
}