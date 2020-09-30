const { Listener, Command } = require("discord-akairo");
const { Message } = require('discord.js');
const db = require("../util/db");
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
            case 'blacklist':
            await msg.channel.send(createEmbed(msg).setFooter('').setTimestamp(null).setTitle('블랙리스트').setDescription('당신은 블랙리스트에 추가되어 있습니다.\n사유: ' + (await db('blacklists').where('id', msg.author.id))[0].reason))
                break
        }
    }
}