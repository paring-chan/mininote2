const { Listener } = require("discord-akairo");
const Sentry = require('@sentry/node');
const db = require("../util/db");

module.exports = class GuildDeleteListener extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        })
    }

    async exec(guild) {
        const dbGuilds = (await db('guilds')).map(r => r.id)
        if (dbGuilds.includes(guild.id)) {
            await db('guilds').delete().where('id', guild.id)
            console.log(`[INSERT] NEW GUILD: ${guild}`)
        }
    }
}