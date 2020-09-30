const { Listener, Command } = require("discord-akairo");
const { Message } = require('discord.js');
const { createEmbed } = require("../util/Embed");
const Sentry = require('@sentry/node')

module.exports = class CommandError extends Listener {
    constructor() {
        super('commandError', {
            emitter: 'commandHandler',
            event: 'error'
        })
    }

    /**
     * @param {Error} err 
     * @param {Message} msg 
     */
    async exec(err, msg) {
        const id = Sentry.captureException(err)
        return msg.util.send(createEmbed(msg).setTitle('오류').setDescription('코드를 개발자에게 전달해주세요: ' + id))
    }
}