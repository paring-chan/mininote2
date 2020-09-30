const { Command, CommandHandler } = require("discord-akairo");
const { Message } = require('discord.js');

module.exports = class Reload extends Command {
    constructor() {
        super('reload', {
            ownerOnly: true,
            aliases: ['reload', '리로드', 'ㄹㄹㄷ'],
            category: 'dev'
        })
    }

    /**
     * @param {Message} msg 
     */
    async exec(msg) {
        /**
         * @type {CommandHandler}
         */
        Object.keys(require.cache).filter(r => !r.includes('node_modules')).forEach(r => delete require.cache[r])
        this.client.commandHandler.categories.forEach(c => c.removeAll())
        this.client.listenerHandler.categories.forEach(c => c.removeAll())
        this.client.inhibitorHandler.categories.forEach(c => c.removeAll())
        this.client.commandHandler.loadAll()
        this.client.listenerHandler.loadAll()
        this.client.inhibitorHandler.loadAll()
        await msg.react('✔')
    }
}