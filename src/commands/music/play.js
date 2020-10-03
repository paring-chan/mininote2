const { Command } = require("discord-akairo");
const { Message } = require("discord.js");
const { createEmbed } = require("../../util/Embed");


module.exports = class Play extends Command {
    constructor() {
        super('재생', {
            aliases: ['재생', 'play'],
            clientPermissions: ['CONNECT', 'SPEAK'],
            args: [
                {
                    id: 'title',
                    prompt: {
                        start: '제목 입력하삼'
                    },
                    type: 'string',
                    match: 'text'
                }
            ],
            category: 'music'
        })
    }
    /**
     * @param {Message} msg 
     * @param {{title: string}} param1 
     */
    async exec(msg, { title }) {
        const res = await this.client.music.search(
            title,
            msg.author
        )
        
        /**
         * @type {import("erela.js").Track | import("erela.js").Track[]}
         */
        let track

        switch (res.loadType) {
            case 'NO_MATCHES':
                return msg.util.send(createEmbed(msg).setTitle('그런 곡 없는데요').setFooter('').setTimestamp(null))
            case 'LOAD_FAILED':
                return msg.util.send(createEmbed(msg).setTitle('불러오기 실패').setFooter('').setTimestamp(null))
            case 'SEARCH_RESULT':
                try {
                    await new Promise(async (resolve, reject) => {
                        const tracks = res.tracks.slice(0,10)
                        const embed = createEmbed(msg)
                        embed.setTitle(`1-${tracks.length}중 선택`)
                        embed.setDescription(tracks.map((r,i) => `${i+1} - [${r.title}](${r.uri})`))
                        await msg.util.send(embed)
                        const collector = msg.channel.createMessageCollector(r => r.author.id === msg.author.id && /^[1-9]|10|취소$/.test(r.content), {
                            time: 30000,
                            max: 1
                        })
    
                        collector.on('collect', async m => {
                            if (m.content === '취소') return collector.stop('cancel')
                            const idx = Number(m.content)-1
                            track = tracks[idx]
                            return resolve()
                        })
    
                        collector.on('end', (_,reason) => {
                            if (['cancel','time'].includes(reason)) return reject(msg.util.reply('취소됨'))
                            return resolve()
                        })
                    })
                } catch(e) {
                    return
                }
                break
            case 'PLAYLIST_LOADED':
                track = res.tracks
                break
            case 'TRACK_LOADED':
                track = res.tracks[0]
                break
        }


        const player = this.client.music.create({
            guild: msg.guild.id,
            voiceChannel: msg.member.voice.channel.id,
            textChannel: msg.channel.id
        })

        player.queue.add(track)

        const embed = createEmbed(msg)

        if (res.loadType === 'PLAYLIST_LOADED') {
            embed.setTitle('재생목록 추가 - ' + res.playlist.name)
            embed.addField('추가된 곡 수', track.length)
        }
        
        if (res.loadType === 'TRACK_LOADED' || res.loadType === 'SEARCH_RESULT') {
            embed.setTitle('곡 추가 - ' + track.title)
            embed.setImage(track.displayThumbnail('maxresdefault'))
        }

        await msg.util.send(embed)

        player.connect()

        if (!player.playing && !player.paused && !player.queue.length)
            player.play()

        if (
            !player.playing &&
            !player.paused &&
            player.queue.size === res.tracks.length
        )
            player.play()
    }
}