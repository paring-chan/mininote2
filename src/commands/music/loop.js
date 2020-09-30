const { Command } = require("discord-akairo");
const { Message } = require("discord.js");
const { reject } = require("lodash");
const { client } = require("../../util/db");
const { createEmbed } = require("../../util/Embed");
const pagination = require("../../util/pagination");

module.exports = class Play extends Command {
    constructor() {
        super('반복', {
            aliases: ['loop', '반복'],
            category: 'music'
        })
    }
    /**
     * @param {Message} msg 
     */
    async exec(msg) {
        const player = this.client.music.players.get(msg.guild.id)
        if (!player) return msg.util.reply('재생 안하고있는데요')
    }
}