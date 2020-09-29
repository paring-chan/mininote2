const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require("discord-akairo");
const config = require('../../config.json')
const path = require('path')

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
        
    }
}