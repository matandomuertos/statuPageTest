const express = require('express')
const router = express.Router()
const { getDomain, setDomain, updateDomain, deleteDomain } = require('../controllers/domainController')

router.get('/', getDomain).post('/', setDomain)

router.put('/:id', updateDomain).delete('/:id', deleteDomain)


module.exports = router