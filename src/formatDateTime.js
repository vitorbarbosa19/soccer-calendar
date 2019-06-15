const moment = require('moment-timezone')

const formatDateTime = date => moment.tz(date, 'America/Sao_Paulo').format()

module.exports = formatDateTime