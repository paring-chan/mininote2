const { Command, Argument } = require("discord-akairo");
const { Message } = require("discord.js");
const { createEmbed } = require("../../util/Embed");

module.exports = class Play extends Command {
    constructor() {
        super('볼륨', {
            aliases: ['볼륨', 'vol', 'v', 'volume'],
            category: 'music',
            args: [
                {
                    id: 'vol',
                    prompt: {
                        start: '볼륨을 입력하세요(1-100)'
                    },
                    type: Argument.range('integer', 1,100),
                    default: 0
                }
            ]
        })
    }
    /**
     * @param {Message} msg 
     */
    async exec(msg, {vol}) {
        const player = this.client.music.players.get(msg.guild.id)
        if (!player) return msg.util.reply('재생 안하고있는데요')
        if (!vol) return msg.util.send(createEmbed(msg).setTitle('VOLUME').setDescription(`현재 볼륨은 \`${player.volume}%\` 입니다`))
        player.setVolume(vol)
        return msg.util.send(createEmbed(msg).setTitle('VOLUME').setDescription(`볼륨을 \`${player.volume}%\`로 설정했습니다.`))
    }
}