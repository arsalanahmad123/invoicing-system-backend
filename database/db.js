const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI ||
                'mongodb://ahmad:ahmad@cluster0.jaucf3x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        )
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB
