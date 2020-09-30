const { Command, CommandHandler } = require("discord-akairo");
const { Message } = require('discord.js');
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");

module.exports = class Reload extends Command {
    constructor() {
        super('blacklistadd', {
            ownerOnly: true,
            aliases: ['blacklistadd', '블랙리스트추가'],
            category: 'dev',
            args: [
                {
                    id: 'id',
                    prompt: {
                        start: '유저 입력하삼'
                    }
                },
                {
                    id: 'reason',
                    prompt: {
                        start: '사유 입력하삼'
                    },
                    match: 'rest'
                }
            ]
        })
    }

    /**
     * @param {Message} msg 
     */
    async exec(msg, {id, reason}) {
        const u = (await db('blacklists').where('id', id))[0]
        if (u) return msg.util.send('already in blacklist')
        await db('blacklists').insert({id, reason})
        await msg.util.send(createEmbed(msg).setTitle('블랙리스트 추가').addField('유저 ID', id,true).addField('사유', reason,true))
    }
}