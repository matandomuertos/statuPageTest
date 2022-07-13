//Express configuration
//it creates kind of web server with some kind of ingress that depending the paths, can execute different functions
//This file is only used in server.js, it was created to don't make server.js unreadble
const express = require('express'); //import express
const router = express.Router(); //import the router from express
const { getDomain, setDomain, updateDomain, deleteDomain } = require('../controllers/domainController'); //import a few functions from domainController

router.get('/', getDomain).post('/', setDomain) //if the web server gets a GET or POST on '/', it will redirect to those functions

router.put('/:id', updateDomain).delete('/:id', deleteDomain) //if it gets PUT or DELETE on '/asdf1234', it will redirect to those funcions 


module.exports = router //export router