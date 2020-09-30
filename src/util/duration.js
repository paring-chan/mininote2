module.exports.formatDuration = function (s) {
    const ms = s % 1000
    s = (s - ms) / 1000
    const secs = s % 60
    s = (s - secs) / 60
    const mins = s % 60
    const hrs = (s - mins) / 60

    return [hrs, mins, secs].filter(r => r !== 0).join(':')
}