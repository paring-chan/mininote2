const { Listener, Command } = require("discord-akairo");
const { Message } = require('discord.js');
const db = require("../util/db");

module.exports = class CommandError extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        })
    }

    /**
     * @param {Message} msg 
     */
    async exec(msg) {
        if (msg.content === '') return
        if (/^(\?{0,})$/.test(msg.content)) {
            const user = (await db('users').where({id: msg.author.id}))[0]
            if (!user) return
            await db('users').increment('galgories', 1).where('id', msg.author.id)
            return msg.channel.send(`갈고리 줍줍(${user.galgories+1}개)`)
        }
    }
}