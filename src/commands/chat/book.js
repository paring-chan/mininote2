const { Command, CommandHandler } = require("discord-akairo");
const { Message } = require('discord.js');
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");
const pagination = require("../../util/pagination");

module.exports = class Help extends Command {
    constructor() {
        super('지식', {
            aliases: ['지식'],
            args: []
        })
    }

    /**
     * @param {Message} msg
     * @param {{command: string}}
     */
    async exec(msg) {
        const data = (await db('chat').where('id', msg.author.id))
        if (!await pagination(msg, () => data.map(r=>`${r.question} - ${r.response}`),5,createEmbed(msg).setTitle('지식'))) return msg.util.send('님은 알려준게 없는데')
    }
}