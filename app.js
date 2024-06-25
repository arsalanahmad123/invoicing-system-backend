const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./database/db')
const authRouter = require('./routes/auth.routes')
const invoiceRouter = require('./routes/invoice.routes')

app.use(express.json())
app.use(cookieParser())
const corsOptions = {
    origin: '*',
    credentials: true,
}
app.use(cors(corsOptions))
dotenv.config()

const PORT = process.env.PORT || 5000

app.use('/api/auth', authRouter)
app.use('/api/invoice', invoiceRouter)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})
