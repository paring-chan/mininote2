const { Command } = require("discord-akairo");
const { Message } = require("discord.js");
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");
const pagination = require("../../util/pagination");

module.exports = class Play extends Command {
    constructor() {
        super('경고목록', {
            aliases: ['경고목록', 'warnlist'],
            category: 'moderator',
            args: [
                {
                    type: 'member',
                    id: 'user',
                    default: 'all'
                }
            ]
        })
    }
    /**
     * @param {Message} msg 
     */
    async exec(msg, {user}) {
        const warns = JSON.parse((await db('guilds').where('id', msg.guild.id))[0].warns)
        const embed = createEmbed(msg)
        if ((!warns[user.id] || !warns[user.id].length) && user !== 'all') return msg.util.reply('경고가 없는데요')
        if (user === 'all') {
            if (!Object.keys(warns).filter(r=>msg.guild.members.cache.get(r)).length) return msg.util.reply('경고가 없는데요')
            if (!Object.values(warns).filter(r=>msg.guild.members.cache.get(r)).reduce((acc,cur)=> [...acc,...cur]).length) return msg.util.reply('경고가 없는데요')
            embed.setTitle('경고 목록 - 전체')
            if (!await pagination(msg, async () => Object.keys(warns).map(r => warns[r].map(j=>({...j,tag:msg.guild.member(r).user.tag}))).reduce((acc,cur)=> {
                return [...acc,...cur]
            }).map(r => `멤버: ${r.tag} ID: ${r.id} 사유: ${r.reason}`), 10,embed)) {
                return msg.util.reply('경고가 없는데요')
            }
        } else {
            embed.setTitle(`경고 목록 - ${user.user.tag}`)
            if (!await pagination(msg, async () => warns[user.id].map(r => `ID: ${r.id} 사유: ${r.reason}`), 10,embed)) {
                return msg.util.reply('경고가 없는데요')
            }
        }
    }
}