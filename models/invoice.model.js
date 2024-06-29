const mongoose = require('mongoose')
const Counter = require('./counter.model')

async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true },
    )

    if (!sequenceDocument) {
        const newSequence = new Counter({
            _id: sequenceName,
            sequence_value: 1,
        })
        await newSequence.save()
        return 1
    }

    return sequenceDocument.sequence_value
}

const invoiceSchema = new mongoose.Schema(
    {
        _id: { type: Number },
        to: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        quantities: [
            {
                quantity: Number,
                description: String,
                unitprice: Number,
            },
        ],
        subtotal: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
)

invoiceSchema.pre('save', async function (next) {
    if (this.isNew) {
        this._id = await getNextSequenceValue('invoiceid')
    }
    next()
})

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice
