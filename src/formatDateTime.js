const moment = require('moment-timezone')

const monthToNumber = month => {
	switch (month) {
		case 'jan': return '01'
		case 'fev': return '02'
		case 'mar': return '03'
		case 'abr': return '04'
		case 'mai': return '05'
		case 'jun': return '06'
		case 'jul': return '07'
		case 'ago': return '08'
		case 'set': return '09'
		case 'out': return '10'
		case 'nov': return '11'
		case 'dez': return '12'
	}
}

const formatDateTime = (date, time) => {
	const dateTime = `${date.substring(7,11)}-${monthToNumber(date.substring(3,6))}-${date.substring(0,2)} ${time}`
	return moment.tz(dateTime, 'America/Sao_Paulo').format()
}

module.exports = formatDateTime