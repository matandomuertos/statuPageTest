//Main file of the backend
const express = require('express') //import express
const dotenv = require('dotenv').config() //import dotenv to get variables from .env
const { errorHandler } = require('./middleware/errorMiddleware') //import the custom erroHandler
const connectDB = require('./config/db') //import DB connection
const port = process.env.PORT || 6000 //import the port of the backend in .env
const cronJob = require('./tasks/cron') //import the cronjob, this will make the cronjob run directly

connectDB() //connects to the DB

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/domains', require('./routes/domainRoutes')) //set route
app.use('/api/status', require('./routes/statusRoutes')) //set route

app.use(errorHandler) //load errorHandler

app.listen(port, () => console.log(`Sever port: ${port}`)) //open the port and show the message in the console