const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const {Message} = require('discord.js');
const { createEmbed } = require("../../util/Embed");

module.exports = class Evaluate extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            ownerOnly: true,
            args: [
                {
                    id: 'script',
                    prompt: {
                        start: '스크립트를 입력해주세요'
                    },
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
        const embed = createEmbed(msg).setTitle('Eval')
        const input = script.replace(/^```(js)?/,'').replace(/```$/, '')
        embed.addField('INPUT', '```js\n' +
            (input.length > 1000 ? (input.slice(0,1000) + '...') : input).replace('`', '\\`')
            + '```')
        const m = await msg.util.send('Evaluating...')
        embed.addField('OUTPUT','```js\n' + await new Promise(resolve => resolve(eval(input))).then(res => {
            /**
             * @type {string}
             */
            let d = res
            if (typeof res !== 'string') d = require('util').inspect(res)
            embed.setColor('GREEN')
            return d.length > 1000 ? (d.slice(0,1000) + '...') : d
        }).catch(err => {
            let d = err.message
            embed.setColor('RED')
            return d.length > 1000 ? (d.slice(0,1000) + '...') : d
        }) + '```')
        await m.edit(embed)
    }
}