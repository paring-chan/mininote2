const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const {Message} = require('discord.js');
const { loading } = require("../../util/emojis");

module.exports = class Evaluate extends Command {
    constructor() {
        super('shell', {
            aliases: ['shell', 'sh'],
            ownerOnly: true,
            args: [
                {
                    id: 'script',
                    prompt: {
                        start: '스크립트를 입력해주세요'
                    },
                    type: 'string',
                    match: 'text'
                }
            ],
            category: 'dev'
        })
    }

    /**
     * @param {Message} msg
     * @param {{script: string}} script 
     */
    async exec(msg, {script}) {
        const m = await msg.util.send(loading)
        await new Promise(resolve => {
            require('child_process').exec(script, (err,stdout,stderr) => resolve({stdout,stderr}))
        }).then(async res => {
            if (!m.deleted) await m.delete()
            if (res.stdout) {
                await msg.channel.send('STDOUT\n```sh\n' + (res.stdout.length > 1900 ? (res.stdout.slice(0,1900) + '...') : res.stdout) + '```')
            }
            if (res.stderr) {
                await msg.channel.send('STDERR\n```sh\n' + (res.stderr.length > 1900 ? (res.stderr.slice(0,1900) + '...') : res.stderr) + '```')
            }
        })
    }
}