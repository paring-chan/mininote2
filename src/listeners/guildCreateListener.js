const { Listener } = require("discord-akairo");
const Sentry = require('@sentry/node');
const db = require("../util/db");

module.exports = class GuildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        })
    }

    async exec(guild) {
        const dbGuilds = (await db('guilds')).map(r => r.id)
        if (!dbGuilds.includes(guild.id)) {
            await db('guilds').insert({ id: guild })
            console.log(`[INSERT] NEW GUILD: ${guild}`)
        }
    }
}