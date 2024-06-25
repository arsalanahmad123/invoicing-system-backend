const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generatetoken')

const bcryptCompare = (password, hash) =>
    new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, res) => {
            if (err) return reject(err)
            resolve(res)
        })
    })

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        generateToken(user._id, res)
        res.status(201).json({ data: user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const passwordMatch = await bcryptCompare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        generateToken(user._id, res)

        const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('jwt')

        res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

module.exports = { signup, login, logout }
