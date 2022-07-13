// Functions related to get/set/update/whatever domains in mongoDB
const asyncHandler = require('express-async-handler'); //Middleware for handling exceptions inside of async express routes and passing them to your express error handlers
const Domain = require('../models/domainModel'); //import mongo object schema

// Express (web/http) functions:

// @desc    Get domains
// @route   GET /api/domains
// @access  Private
const getDomain = asyncHandler(async (req, res) => {
	const domains = await Domain.find()

	res.status(200).json(domains)
})

// @desc    Create domains
// @route   POST /api/domains
// @access  Private
const setDomain = asyncHandler(async (req, res) => {
	if(!req.body.name || !req.body.url){
		res.status(400)
		throw new Error('Please add a domain name and url')
	}

	const domain = await Domain.create({
		name: req.body.name,
		url: req.body.url
	})

	res.status(201).json(domain)
})

// @desc    Update domains
// @route   PUT /api/domains/:id
// @access  Private
const updateDomain = asyncHandler(async (req, res) => {
	const domain = await Domain.findById(req.params.id)

	if (!domain) {
		res.status(400)
		throw new Error('Domain not found')
	}

	const updatedDomain = await Domain.findByIdAndUpdate(req.params.id, req.body)

  	res.status(200).json(updatedDomain)
})

// @desc    Delete domains
// @route   GET /api/domains/:id
// @access  Private
const deleteDomain = asyncHandler(async (req, res) => {
	const domain = await Domain.findById(req.params.id)

	if (!domain) {
		res.status(400)
		throw new Error('Domain not found')
	}

	await domain.remove()

	res.status(200).json({id: req.params.id})	
})

// Internal functions, used in cron and statusController:

async function updateDomainLastStatus(domainId, isUp){
	const domain = await Domain.findById(domainId)
	let updatedDomain

	if (!domain) {
		return updatedDomain
	}

	updatedDomain = await Domain.findByIdAndUpdate(domainId, { ping: isUp })

  	return updatedDomain
}


async function getDomainById(domainId){
	const domain = await Domain.findById(domainId)
	return domain
}

// Export all the functions
module.exports = {
	getDomain, setDomain, updateDomain, deleteDomain, updateDomainLastStatus, getDomainById
}