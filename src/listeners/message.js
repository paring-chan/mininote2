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
        if (msg.content === '?') {
            const user = await db('users').where({id: msg.author.id})
            
        }
    }
}