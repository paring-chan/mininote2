const { ShardingManager } = require("discord.js");
const path = require('path')
const config = require('../config.json')
const Sentry = require('@sentry/node')

Sentry.init({
    dsn: config.sentry.dsn
})

Sentry.setTag('part', 'sharding manager')

const manager = new ShardingManager(path.join(__dirname, 'bot.js'), {
    token: config.token
})

manager.on('shardCreate', shard => console.log(`Launched shard #${shard.id}`))

manager.spawn()
