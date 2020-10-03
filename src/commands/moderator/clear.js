const { Command, Argument } = require("discord-akairo");
const { Message } = require("discord.js");

module.exports = class Play extends Command {
    constructor() {
        super('청소', {
            aliases: ['청소', 'clear'],
            category: 'moderator',
            args: [
                {
                    type: Argument.range('integer', 1,100),
                    id: 'count',
                    prompt: {
                        start: '지울 채팅 개수 입력(1-99)'
                    }
                }
            ],
            userPermissions: ['MANAGE_CHANNELS'],
            clientPermissions: ['MANAGE_CHANNELS']
        })
    }
    /**
     * @param {Message} msg 
     */
    async exec(msg, {count}) {
        const messages = await msg.channel.bulkDelete(count+1)
        await msg.util.send(`메시지 ${messages.size-1}개 삭제됨`)
    }
}