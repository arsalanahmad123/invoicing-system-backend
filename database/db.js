const mongoose = require('mongoose')

const Counter = require('../models/counter.model')

async function initializeCounter() {
    const counter = await Counter.findById('invoiceid')
    if (!counter) {
        const newCounter = new Counter({
            _id: 'invoiceid',
            sequence_value: 1000,
        })
        await newCounter.save()
        console.log('Initialized invoiceid counter to 1000')
    } else {
        console.log('Counter already exists:', counter)
    }
}
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
        initializeCounter()
    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        process.exit(1)
    }
}

module.exports = connectDB
