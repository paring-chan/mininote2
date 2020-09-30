const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require("discord-akairo");
const config = require('../../config.json')
const path = require('path');
const { Manager } = require("erela.js");

module.exports = class MiniNoteClient extends AkairoClient {
    /**
     * @type {CommandHandler}
     */
    commandHandler

    /**
     * @type {InhibitorHandler}
     */
    inhibitorHandler

    /**
     * @type {ListenerHandler}
     */
    listenerHandler

    constructor() {
        super({
            ownerID: config.owner,
            
        }, {
            disableMentions: 'everyone'
        })
        this.commandHandler = new CommandHandler(this, {
            directory: path.resolve(path.join(__dirname, '..', 'commands')),
            prefix: config.prefix,
            commandUtil: true
        })
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: path.resolve(path.join(__dirname, '..', 'inhibitors'))
        })
        this.listenerHandler = new ListenerHandler(this, {
            directory: path.resolve(path.join(__dirname, '..', 'listeners'))
        })
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        })
        this.listenerHandler.loadAll()
        this.commandHandler.loadAll()
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
        this.inhibitorHandler.loadAll()
        this.music = new Manager({
            nodes: config.nodes,
            send: (id, payload) => {
                const guild = this.guilds.cache.get(id)
                if (guild) guild.shard.send(payload)
            },
            autoPlay: true
        }).on('nodeConnect', () => console.log('Connected to a lavalink node'))
            .on('nodeDisconnect', () => console.log('Disconnected from a lavalink node'))
            .on('nodeError', (node,err) => console.log(`Error from node: ${err.message}`))
            .on('nodeReconnect', () => console.log('reconnecting to new node....'))
            .on('nodeDestroy', () => console.log('destroyed a node'))
            .on('trackStart', (player,track)=> {
                this.channels.cache.get(player.textChannel).send('재생 시작: ' + track.title)
            })
            .on('queueEnd', (player) => {
                this.channels.cache.get(player.textChannel).send('재생 끝')
                player.destroy()
            })
    }
}