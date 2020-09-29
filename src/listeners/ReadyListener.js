const { Listener } = require("discord-akairo");
const Sentry = require('@sentry/node')

module.exports = class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        })
    }

    exec() {
        if (!this.client.shard) {
            console.error('Shard only')
            return process.exit(0)
        }
        Sentry.setTag('part', `Shard #${this.client.shard.ids.reduce((acc,cur) => acc+cur)}`)
        console.log(`Shard #${this.client.shard.ids.reduce((acc,cur) => acc+cur)} ready.`)
    }
}