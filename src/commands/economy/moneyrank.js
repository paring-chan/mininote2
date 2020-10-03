const { Command } = require("discord-akairo");
const { User } = require("discord.js");
const { Message } = require('discord.js');
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");
const pagination = require("../../util/pagination");

module.exports = class Money extends Command {
    constructor() {
        super('돈랭킹', {
            aliases: ['돈랭킹'],
            category: 'economy'
        })
    }

    /**
     * @param {Message} msg
     */
    async exec(msg) {
        const users = (await this.client.shard.broadcastEval('this.users.cache.map(r => ({id: r.id, tag: r.tag}))')).reduce((acc,cur) => [...acc,...cur])
        await pagination(msg, async () => {
            return (await db('users').orderBy('balance', 'desc')).filter(r => users.map(r => r.id).includes(r.id)).map((r, i) => `${i+1}위: ${users.find(j => j.id === r.id).tag}(${r.balance}돈)`)
        }, 5, createEmbed(msg).setTitle('돈 랭킹'))
    }
}