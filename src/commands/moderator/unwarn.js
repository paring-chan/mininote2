const { Command } = require("discord-akairo");
const { Message } = require("discord.js");
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");

module.exports = class Play extends Command {
    constructor() {
        super('경고제거', {
            aliases: ['경고제거', 'unwarn'],
            category: 'moderator',
            args: [
                {
                    type: 'member',
                    id: 'user',
                    prompt: {
                        start: '유저 입력하삼'
                    }
                }, {
                    type: 'integer',
                    id: 'id',
                    prompt: {
                        start: '경고 ID 입력하삼'
                    }
                }
            ],
            userPermissions: ['ADMINISTRATOR']
        })
    }
    /**
     * @param {Message} msg 
     */
    async exec(msg, {user, id}) {
        const warns = JSON.parse((await db('guilds').where('id', msg.guild.id))[0].warns)
        if (!warns[user.id]) {
            warns[user.id] = []
        }
        if (!warns[user.id].find(r => r.id === id)) return msg.util.send('그런 경고 없는데요')
        warns[user.id] = warns[user.id].filter(r => r.id !== id)
        await db('guilds').where('id', msg.guild.id).update({warns: JSON.stringify(warns)})
        await msg.util.send(createEmbed(msg).setTitle('경고 해제').addField('유저', user.user.tag,true).addField('ID', id,true))
        await msg.react('✔')
    }
}