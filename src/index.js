require('dotenv').config()
const get = require('axios').get

const getCalendarData = async () => {
	const { data } = await get(`${process.env.URL}`)
	console.log(data)
}

getCalendarData()