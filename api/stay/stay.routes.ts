const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const stayController = require('./stay.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, stayController.getStays)
// router.get('/update', log, stayController.update)
router.get('/filters', log, stayController.getFilters)
router.get('/:id', stayController.getStayById)
// router.get('/edit/:id', getStayToEdit)
// router.post('/', requireAuth, addStay)
// router.put('/:id', requireAuth, updateStay)
// router.delete('/:id', requireAuth, removeStay)

module.exports = router
