const jwt = require('jsonwebtoken')

const jwtOptions = {
    expiresIn: '1d',
}

const cookieOptions = {
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
}

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, jwtOptions)
    res.cookie('jwt', token, cookieOptions)
}

module.exports = generateToken
