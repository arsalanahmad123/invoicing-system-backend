const Invoice = require('../models/invoice.model')

const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 })

        res.status(200).json({
            data: invoices,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getInvoice = async (req, res) => {
    try {
        const { id } = req.params
        const invoice = await Invoice.findById(id)
        res.status(200).json({ data: invoice })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createInvoice = async (req, res) => {
    try {
        const { to, address, total } = req.body

        const invoice = new Invoice({
            to,
            address,
            total,
        })

        await invoice.save()

        res.status(201).json({ data: invoice._id })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params

        await Invoice.findByIdAndDelete(id)

        res.status(200).json({ message: 'Invoice deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getInvoice,
    getInvoices,
    createInvoice,
    deleteInvoice,
}
