const { Command } = require("discord-akairo");
const { Message } = require("discord.js");
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");

module.exports = class Play extends Command {
    constructor() {
        super('경고', {
            aliases: ['경고', 'warn'],
            category: 'moderator',
            args: [
                {
                    type: 'member',
                    id: 'user',
                    prompt: {
                        start: '유저 입력하삼'
                    }
                }, {
                    type: 'string',
                    id: 'reason',
                    match: 'rest',
                    default: '사유 없음'
                }
            ],
            userPermissions: ['ADMINISTRATOR']
        })
    }
    /**
     * @param {Message} msg 
     */
    async exec(msg, {user, reason}) {
        const warns = JSON.parse((await db('guilds').where('id', msg.guild.id))[0].warns)
        if (!warns[user.id]) {
            warns[user.id] = []
        }
        const id = Date.now()
        warns[user.id].push({
            reason,
            id
        })
        await db('guilds').where('id', msg.guild.id).update({warns: JSON.stringify(warns)})
        await msg.util.send(createEmbed(msg).setTitle('경고').addField('유저', user.user.tag,true).addField('ID', id,true).addField('사유', reason))
        await msg.react('✔')
    }
}