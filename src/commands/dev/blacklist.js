const {Command} = require("discord-akairo");
const {Message} = require('discord.js');
const db = require("../../util/db");
const {createEmbed} = require("../../util/Embed");
const pagination = require("../../util/pagination");

module.exports = class Blacklist extends Command {
    constructor() {
        super('blacklist', {
            ownerOnly: true,
            aliases: ['블랙리스트', 'blacklist'],
            category: 'dev'
        })
    }

    /**
     * @param {Message} msg
     */
    async exec(msg) {
        if (!await pagination(msg, async () => {
            return (await db('blacklists')).map(r => `ID: ${r.id} 사유: ${r.reason}`)
        }, 10, createEmbed(msg))) return msg.util.send('블랙리스트가 없습니다')
    }
}