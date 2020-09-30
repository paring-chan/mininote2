const { Inhibitor } = require('discord-akairo');
const { Message } = require('discord.js');
const db = require('../util/db')

class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('register', {
            reason: 'register'
        })
    }
    /**
     * @param {Message} msg
     */
    async exec(msg) {
        if (msg.util.parsed.command.id === '가입') return false
        const user = (await db('users').where('id', msg.author.id))[0]
        return user === undefined
    }
}

module.exports = BlacklistInhibitor;