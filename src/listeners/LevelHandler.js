const { configureScope } = require("@sentry/node");
const { Listener } = require("discord-akairo");
const { Message } = require('discord.js');
const db = require("../util/db");
const { getNeedLevel } = require("../util/level");

module.exports = class commandBlocked extends Listener {
    constructor() {
        super('level', {
            emitter: 'client',
            event: 'message'
        })
    }

    /**
     * @param {Message} msg 
     */
    async exec(msg) {
        if (msg.author.bot) return
        if (!(await msg.client.commandHandler.parseCommand(msg)).command) {
            const user = (await db('users').where('id', msg.author.id))[0]
            if (!user) return
            if (user.lastXp && Date.now() - user.lastXp < 1000*10) return
            const rand = Math.floor((Math.random() * (10-1+1)) + 1);
            const xp = user.xp+rand
            let level = user.level
            if (getNeedLevel(level+1) < xp) {
                await msg.channel.send(`레벨업: 레벨 ${level} > ${++level}`)
            }
            await db('users').update({xp,level,lastXp: Date.now()}).where('id', msg.author.id)
        }
    }
}