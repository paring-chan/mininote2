const { Inhibitor } = require('discord-akairo');
const db = require('../util/db')

class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        })
    }

    async exec(msg) {
        const blacklist = (await db('blacklists').where('id', msg.author.id))[0]
        return blacklist !== undefined
    }
}

module.exports = BlacklistInhibitor;