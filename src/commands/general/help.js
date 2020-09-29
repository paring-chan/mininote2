const { Command, CommandHandler } = require("discord-akairo");
const { Message } = require('discord.js');
const { createEmbed } = require("../../util/Embed");

module.exports = class Help extends Command {
    constructor() {
        super('도움말', {
            aliases: ['help', '도움말', '도움'],
            args: [
                {
                    id: 'command',
                    default: '',
                    type: 'string'
                }
            ]
        })
    }

    /**
     * @param {Message} msg
     * @param {{command: string}}
     */
    async exec(msg, {command}) {
        const embed = createEmbed(msg)
        embed.setTitle('도움말')
        /**
         * @type {CommandHandler}
         */
        const h = this.client.commandHandler
        h.categories.keyArray().map((category) => {
            const arr = h.categories.get(category).map(r => r.id)
            arr.unshift(category)
            return arr
        }).forEach(category => {
            embed.addField(category.shift(), category.map(r => '`'+r+'`').join(' '))
        })
        await msg.util.send(embed)
    }
}