require('dotenv').config()
const get = require('axios').get

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
}

getMatches()