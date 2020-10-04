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
            const u = (await this.client.shard.broadcastEval(`this.users.cache.get('${chat?.id}')`)).filter(r=>r)[0]
            if (!chat || !u) {
                return msg.channel.send('그게 뭐에요...?')
            }
            await msg.channel.send(`${chat.response}\n\`${u.tag}\`님이 알려주셨어요(바나나는 이게 어디있는지 모를것이야)`)
        }
    }
}

module.exports = MessageInvalidListener;