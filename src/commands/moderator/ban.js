const { Command } = require("discord-akairo");
const { Message } = require("discord.js");

module.exports = class Play extends Command {
    constructor() {
        super('밴', {
            aliases: ['밴', 'ban'],
            category: 'moderator',
            args: [
                {
                    type: 'member',
                    id: 'user',
                    prompt: {
                        start: '유저 입력하삼'
                    }
                }
            ],
            userPermissions: ['KICK_MEMBERS']
        })
    }
    /**
     * @param {Message} msg 
     */
    async exec(msg, {user}) {
        await user.ban()
        await msg.react('✔')
    }
}