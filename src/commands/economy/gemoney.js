const { Command } = require("discord-akairo");
const { User } = require("discord.js");
const { Message } = require('discord.js');
const { create } = require("lodash");
const db = require("../../util/db");
const { createEmbed } = require("../../util/Embed");

module.exports = class Money extends Command {
    constructor() {
        super('돈내놔', {
            cooldown: 1000 * 60 * 60 * 5,
            aliases: ['돈내놔', '돈줘'],
            category: 'economy'
        })
    }

    /**
     * @param {Message} msg
     * @param {{member: User}}
     */
    async exec(msg, {member}) {
        if (member === 'me') member = msg.author
        const money = Math.floor(Math.random() * (5000) + 10000)
        await db('users').increment('balance', money).where('id', msg.author.id)
        await msg.util.send(createEmbed(msg).setTitle('돈받기').setDescription(`${money} 돈을 받았습니다.\n현재: ${(await db('users').where('id', msg.author.id))[0].balance}`))
    }
}