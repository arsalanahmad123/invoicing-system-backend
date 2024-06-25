const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            console.log('No token provided')
            return res
                .status(401)
                .json({ error: 'Unauthorized - No Token Provided' })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decodedToken) => {
                if (err) {
                    console.log('Token verification failed:', err.message)
                    return res
                        .status(401)
                        .json({ error: 'Unauthorized - Invalid Token' })
                }
                return decodedToken
            },
        )
        if (!decoded) {
            console.log('Invalid token')
            return res
                .status(401)
                .json({ error: 'Unauthorized - Invalid Token' })
        }

        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            console.log('User not found')
            return res.status(404).json({ error: 'Unauthorized' })
        }

        next()
    } catch (error) {
        console.log('Error in protectRoute middleware:', error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = protectRoute
