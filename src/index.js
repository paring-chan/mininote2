const { ShardingManager } = require("discord.js");
const path = require('path')
const config = require('../config.json')
const Sentry = require('@sentry/node');
const db = require("./util/db");

Sentry.init({
    dsn: config.sentry.dsn
})

Sentry.setTag('part', 'sharding manager')

const manager = new ShardingManager(path.join(__dirname, 'bot.js'), {
    token: config.token
})

manager.on('shardCreate', shard => console.log(`Launched shard #${shard.id}`))

manager.spawn().then(async () => {
    const guilds = (await manager.broadcastEval('this.guilds.cache.map(r => r.id)')).reduce((acc,cur) => [...acc,...cur])
    const dbGuilds = (await db('guilds')).map(r => r.id)
    for (let guild of dbGuilds) {
        if (!guilds.includes(guild)) {
            await db('guilds').delete().where('id', guild)
            console.log(`[DROP] DELETE GUILD: ${guild}`)
        }
    }
})
