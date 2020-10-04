const { Command, CommandHandler } = require("discord-akairo");
const { Message } = require('discord.js');
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");

module.exports = class Help extends Command {
    constructor() {
        super('배워', {
            aliases: ['배워'],
            args: [
                {
                    id: 'question',
                    default: '질문 입력하삼(띄어쓰기 안됨)',
                    type: 'string'
                },
                {
                    id: 'response',
                    default: '대답 입력하삼(띄어쓰기 가능)',
                    type: 'string',
                    match: 'rest'
                }
            ]
        })
    }

    /**
     * @param {Message} msg
     * @param {{command: string}}
     */
    async exec(msg, {question,response}) {
        if ((await db('chat').where('question', question.replace(' ', '')))[0]) return msg.util.send('그건 이미 아는건데요')
        await db('chat').insert({question,response,id: msg.author.id})
        await msg.util.send('저장했어요')
    }
}