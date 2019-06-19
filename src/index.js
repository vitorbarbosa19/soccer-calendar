require('dotenv').config()
const get = require('axios').get
const calendarAPI = require('node-google-calendar')
const settings = require('./settings')
const formatDateTime = require('./formatDateTime')

const getMatches = async () => {
	try {
		const { data: { events } } = await get(`${process.env.API_URL}`)
		const matches = events.map(event => {
			const [teamAway, teamHome] = event.name.split(' at ')
			const match = [teamHome, teamAway].join(' x ')
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
		let response = []
		const calendar = new calendarAPI(settings)
		for (let index = 0; index < matches.length; index++) {
			const { summary } = await calendar.Events.insert(process.env.CALENDAR_ID, matches[index])
			response.push(summary)
		}
		console.log(response)
	} catch (error) {
		if (error.response)
			console.log(error.response)
		else
			console.log(error)
	}
}

getMatches()