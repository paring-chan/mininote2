const { Command } = require("discord-akairo");
const { User } = require("discord.js");
const { Message } = require('discord.js');
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");
const pagination = require("../../util/pagination");

module.exports = class Money extends Command {
    constructor() {
        super('랭킹', {
            aliases: ['랭킹'],
            category: 'levels'
        })
    }

    /**
     * @param {Message} msg
     */
    async exec(msg) {
        const users = (await this.client.shard.broadcastEval('this.users.cache.map(r => ({id: r.id, tag: r.tag}))')).reduce((acc,cur) => [...acc,...cur])
        await pagination(msg, async () => {
            return (await db('users').orderBy('xp', 'desc')).filter(r => users.map(r => r.id).includes(r.id)).map((r, i) => `${i+1}위: ${users.find(j => j.id === r.id).tag} xp: ${r.xp} 레벨: ${r.level}`)
        }, 5, createEmbed(msg).setTitle('레벨 랭킹'))
    }
}