require('dotenv').config()
const get = require('axios').get
const calendarAPI = require('node-google-calendar')
const settings = require('./settings')

try {
	const getMatches = async () => {
		const { data: { events } } = await get(`${process.env.URL}`)
		const matches = events.map(event => {
			const nameSplit = event.name.split(' at ')
			const match = [nameSplit[1],nameSplit[0]].join(' x ')
			const leagueName = event.league.shortName.replace('Brazil','Brasil')
			return {
				'summary': `${match}`,
				'start': { 'dateTime': `${event.date}` },
				'end': { 'dateTime': `${event.date}` },
				'description': `${leagueName}`,
				'status': 'confirmed',
				'colorId': '11'
			}
		})
		console.log(matches)
		const calendar = new calendarAPI(settings)
		const response = await calendar.Events.insert(process.env.CALENDAR_ID, matches[0])
		console.log(response)
	}
	getMatches()
} catch (error) {
	console.log(error)
}