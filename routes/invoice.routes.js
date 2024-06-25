const express = require('express')
const router = express.Router()
const protectedRoute = require('../middlewares/protectRoute')

const {
    getInvoices,
    createInvoice,
    deleteInvoice,
    getInvoice,
} = require('../controllers/invoice.controller')

router.get('/', protectedRoute, getInvoices)
router.get('/:id', protectedRoute, getInvoice)
router.post('/create', protectedRoute, createInvoice)
router.delete('/delete/:id', protectedRoute, deleteInvoice)

module.exports = router
