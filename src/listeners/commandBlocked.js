const { Listener, Command } = require("discord-akairo");
const { Message } = require('discord.js');
const { createEmbed } = require("../util/Embed");

module.exports = class commandBlocked extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        })
    }

    /**
     * 
     * @param {Message} msg 
     * @param {Command} cmd 
     * @param {string} reason 
     */
    async exec(msg, cmd, reason) {
        switch (reason) {
            case 'owner':
                await msg.channel.send(createEmbed(msg).setFooter('').setTimestamp(null).setTitle('너 미니노트 개발자 아니라구'))
                return
        }
    }
}