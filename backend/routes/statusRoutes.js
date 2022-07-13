//Express configuration
//it creates kind of web server with some kind of ingress that depending the paths, can execute different functions
//This file is only used in server.js, it was created to don't make server.js unreadble
const express = require('express'); //import express
const router = express.Router(); //import the router from express
const { getStatusByDomainId, updateStatus } = require('../controllers/statusController'); //import a few functions from statusController

router.get('/', getStatusByDomainId).post('/', updateStatus) //if the web server gets a GET or POST on '/', it will redirect to those functions

module.exports = router