const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 6000
const cronJob = require('./tasks/cron')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/domains', require('./routes/domainRoutes'))
app.use('/api/status', require('./routes/statusRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Sever port: ${port}`))