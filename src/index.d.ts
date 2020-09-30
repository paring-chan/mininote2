import { CommandHandler, InhibitorHandler, ListenerHandler } from "discord-akairo";
import { Manager } from "erela.js";

export declare module 'discord.js' {
    interface Client {
        music: Manager
        commandHandler: CommandHandler
        listenerHandler: ListenerHandler
        inhibitorHandler: InhibitorHandler
    }
}