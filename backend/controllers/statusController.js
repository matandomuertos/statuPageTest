// Functions related to get/set/update/whatever statuses in mongoDB
const asyncHandler = require('express-async-handler'); //Middleware for handling exceptions inside of async express routes and passing them to your express error handlers
const Status = require('../models/statusModel'); //import mongo object schema
const DomainController = require('./domainController'); //import domainController to use its functions


// Express (web/http) functions:

// @desc    Get statuses by Domain ID
// @route   GET /api/status
// @access  Private
const getStatusByDomainId = asyncHandler(async (req, res) => {
	const status = await Status.find({ domainId: req.query.domainId }) //find status by ID

	res.status(200).json(status) //response code 200 + the json with the object
})

// @desc    Add or create historic status statuses
// @route   POST /api/status
// @access  Private
const updateStatus = asyncHandler(async (req, res) => {
	if(!req.body.domainId || req.body.isUp == null){ //check if the body includes the right keys
		res.status(400) //response code 400 (bad request)
		throw new Error('Please add a domainId and isUp') //show error in the client using the custom middleware error
	}

	const domain = await DomainController.getDomainById(req.body.domainId) //search domain by id (from DomainController)

	if(!domain){ //if value is null, the domain doesn't exist
		res.status(404)
		throw new Error('Domain not found')
	}

	const updatedStatus = await Status.findOneAndUpdate({ domainId: req.body.domainId }, //search status by domainID
		{ $push: { history: { isUp: req.body.isUp, date: new Date() }}}, //push a new value to 'history' (it doesn't replace, it adds a new element to the array)
		{ upsert: true, //upsert will create the document if it doesn't exist. For example, first time when the status is registered
		  new: true }) //true will return the document already modified, false will return the document before get modified

	const updatedDomain = await DomainController.updateDomainLastStatus(req.body.domainId, req.body.isUp) //Updates the last status in the domain

	if(!updatedDomain){ //if the return is null, something went wrong updating the domain
		res.status(500)
		throw new Error('Domain not updated')
	}	

  	res.status(201).json(updatedStatus)//if everything is fine, it will show 201 (created) and the document modified
})

module.exports = { //export all the functions
	getStatusByDomainId, updateStatus
}