const { Listener } = require('discord-akairo');
const db = require('../util/db');

class MessageInvalidListener extends Listener {
    constructor() {
        super('messageInvalid', {
            emitter: 'commandHandler',
            event: 'messageInvalid'
        })
    }

    async exec(msg) {
        const {prefix} = require('../../config.json')
        if (msg.content.startsWith(prefix)) {
            const content = msg.content.slice(prefix.length).replace(' ', '')
            const chat = (await db('chat').where({question: content}))[0]
            if (!chat) {
                return msg.channel.send('그게 뭐에요...?')
            }
            await msg.channel.send(`${chat.response}`)
        }
    }
}

module.exports = MessageInvalidListener;