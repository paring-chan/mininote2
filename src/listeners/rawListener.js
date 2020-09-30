const { Listener } = require("discord-akairo");
const Sentry = require('@sentry/node');
const db = require("../util/db");

module.exports = class RawListener extends Listener {
    constructor() {
        super('raw', {
            emitter: 'client',
            event: 'raw'
        })
    }

    async exec(d) {
        return this.client.music.updateVoiceState(d)
    }
}