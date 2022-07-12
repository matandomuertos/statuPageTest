const express = require('express')
const router = express.Router()
const { getStatusByDomainId, updateStatus } = require('../controllers/statusController')

router.get('/', getStatusByDomainId).post('/', updateStatus)

module.exports = router