const asyncHandler = require('express-async-handler')
const Status = require('../models/statusModel')
const DomainController = require('./domainController')

// @desc    Get statuses by Domain ID
// @route   GET /api/status
// @access  Private
const getStatusByDomainId = asyncHandler(async (req, res) => {
	const status = await Status.find({ domainId: req.query.domainId })

	res.status(200).json(status)
})

// @desc    Add or create historic status statuses
// @route   PUT /api/status
// @access  Private
const updateStatus = asyncHandler(async (req, res) => {
	if(!req.body.domainId || req.body.isUp == null){
		res.status(400)
		throw new Error('Please add a domainId and isUp')
	}

	const domain = await DomainController.getDomainById(req.body.domainId)

	if(!domain){
		res.status(404)
		throw new Error('Domain not found')
	}

	const updatedStatus = await Status.findOneAndUpdate({ domainId: req.body.domainId }, { $push: 
		{ history: { isUp: req.body.isUp, date: new Date() }}
	}, { upsert: true, new: true })

	const updatedDomain = await DomainController.updateDomainLastStatus(req.body.domainId, req.body.isUp)

	if(!updatedDomain){
		res.status(500)
		throw new Error('Domain not updated')
	}	

  	res.status(201).json(updatedStatus)
})

module.exports = {
	getStatusByDomainId, updateStatus
}