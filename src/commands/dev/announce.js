const { Command } = require("discord-akairo");
const { Message } = require('discord.js');
const { createEmbed } = require("../../util/Embed");

module.exports = class Reload extends Command {
    constructor() {
        super('announce', {
            ownerOnly: true,
            aliases: ['announce', '공지'],
            category: 'dev',
            args: [
                {
                    id: 'content',
                    match: 'text',
                    type: 'string'
                }
            ]
        })
    }

    /**
     * @param {Message} msg 
     */
    async exec(msg, {content}) {
        await msg.util.send('전송중..')
        await this.client.shard.broadcastEval(`
        (async () => {
            for (let guild of this.guilds.cache.map(r=>r)) {
                console.log('Sending announcement to guild ' + guild.id + '(' + guild.name + ')')
                await (guild.channels.cache.find(r=> (r.type === 'text' || r.type === 'news') && r.topic && r.topic.includes('*미니노트') && r.permissionsFor(guild.me).has(['SEND_MESSAGES','EMBED_LINKS'])) || guild.channels.cache.filter(r=> (r.type === 'text' || r.type === 'news') && r.permissionsFor(guild.me).has(['SEND_MESSAGES','EMBED_LINKS'])).random())?.send({embed:${JSON.stringify(
                    createEmbed(msg).setTitle('미니노트 공지').setDescription(content + '\n공지 왜 여기로 오냐구요? 토픽에 `*미니노트`를 넣으면 그 채널로 공지가 와요!').toJSON()
                )}})
            }
        })()`)
        await msg.util.send('전송 완료')
    }
}