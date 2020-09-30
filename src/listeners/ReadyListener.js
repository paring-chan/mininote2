const { Listener } = require("discord-akairo");
const Sentry = require('@sentry/node');
const db = require("../util/db");

module.exports = class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        })
    }

    async exec() {
        if (!this.client.shard) {
            console.error('Shard only')
            return process.exit(0)
        }
        this.client.music.init(this.client.user.id)
        Sentry.setTag('part', `Shard #${this.client.shard.ids.reduce((acc,cur) => acc+cur)}`)
        console.log(`Shard #${this.client.shard.ids.reduce((acc,cur) => acc+cur)} ready.`)
        console.log('processing guilds....')
        const dbGuilds = (await db('guilds')).map(r => r.id)
        for (let guild of this.client.guilds.cache.map(r => r.id)) {
            if (!dbGuilds.includes(guild)) {
                await db('guilds').insert({id: guild})
                console.log(`[INSERT] NEW GUILD: ${guild}`)
            }
        }
    }
}