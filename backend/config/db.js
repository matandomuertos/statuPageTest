// DB config
const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI) //connect to DB getting the URI from .env
		console.log(`MongoDB connected: ${conn.connection.host}`) //confirm connection in console
	} catch (error){
		console.log(error)
		process.exit(1)
	}
}

module.exports = connectDB