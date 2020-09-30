const { Command } = require("discord-akairo");
const { User } = require("discord.js");
const { Message } = require('discord.js');
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");

module.exports = class Money extends Command {
    constructor() {
        super('돈', {
            args: [
                {
                    type: 'user',
                    default: 'me',
                    id: 'member'
                }
            ],
            aliases: ['돈'],
            category: 'economy'
        })
    }

    /**
     * @param {Message} msg
     * @param {{member: User}}
     */
    async exec(msg, {member}) {
        if (member === 'me') member = msg.author
        const u = (await db('users').where('id', member.id))[0]
        if (!u) return msg.util.send(createEmbed(msg).setFooter('').setTimestamp(null).setDescription(`미니노트 서비스 가입 안한 ${member.bot ? '사람....이 아니군요' : '사람인데요'}`))
        await msg.util.send(createEmbed(msg).setTitle(`${member.tag}님의 돈`).setDescription(`${u.balance}돈(?)(바나나가 단위를 안말해줬다)`))
    }
}