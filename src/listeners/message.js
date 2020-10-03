const { Listener, Command } = require("discord-akairo");
const { Message } = require('discord.js');

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
        }
    }
}