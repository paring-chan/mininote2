const MiniNoteClient = require("./structs/MiniNoteClient");
const config = require('../config.json')
const Sentry = require('@sentry/node')

Sentry.init({
    dsn: config.sentry.dsn
})

const client = new MiniNoteClient()

client.login(config.token)