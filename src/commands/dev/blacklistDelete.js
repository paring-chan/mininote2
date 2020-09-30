const { Command, CommandHandler } = require("discord-akairo");
const { Message } = require('discord.js');
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");

module.exports = class BlacklistDelete extends Command {
    constructor() {
        super('blacklistremove', {
            ownerOnly: true,
            aliases: ['blacklistremove', '블랙리스트제거'],
            category: 'dev',
            args: [
                {
                    id: 'id',
                    prompt: {
                        start: '유저 입력하삼'
                    }
                }
            ]
        })
    }

    /**
     * @param {Message} msg 
     */
    async exec(msg, {id}) {
        const u = (await db('blacklists').where('id', id))[0]
        if (!u) return msg.util.send('not in blacklist')
        await db('blacklists').delete().where('id', id)
        await msg.util.send(createEmbed(msg).setTitle('블랙리스트 제거').addField('유저 ID', id,true))
    }
}