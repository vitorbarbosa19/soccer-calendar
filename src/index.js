require('dotenv').config()
const get = require('axios').get
const calendarAPI = require('node-google-calendar')
const settings = require('./settings')
const formatDateTime = require('./formatDateTime')

try {
	const getMatches = async () => {
		const { data: { events } } = await get(`${process.env.URL}`)
		const matches = events.map(event => {
			const nameSplit = event.name.split(' at ')
			const match = [nameSplit[1],nameSplit[0]].join(' x ')
			const matchDate = formatDateTime(event.date)
			const leagueName = event.league.shortName.replace('Brazil','Brasil')
			return {
				'summary': `${match}`,
				'start': { 'dateTime': `${matchDate}` },
				'end': { 'dateTime': `${matchDate}` },
				'description': `${leagueName}`,
				'status': 'confirmed',
				'colorId': '11'
			}
		})
		const calendar = new calendarAPI(settings)
		const response = await calendar.Events.insert(process.env.CALENDAR_ID, matches[0])
		console.log(response)
	}
	getMatches()
} catch (error) {
	console.log(error)
}