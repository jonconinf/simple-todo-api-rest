const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const accountRepository = require('../repositories/accountRepository')

const { ApiError } = require("../models/ApiError");

const loginBodyValidator = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 }).required(),
    password: Joi.string()
        .required()
})

async function login(userData) {
    try {
        const { error } = loginBodyValidator.validate(userData)

        if (error) {
            throw ApiError('Invalid request body', 400)
        }

        const user = await accountRepository.findUserByEmail(userData.email)

        if (!user) {
            throw ApiError('Invalid login', 401)
        }

        const hashedPassword = bcrypt.hashSync(userData.password, user.salt);

        if (hashedPassword !== user.passwordHash) {
            throw ApiError('Invalid login', 401)
        }

        const dayInSeconds = 24 * 60 * 60;
        const encodedSecret = btoa(process.env.JWT_SECRET)
        const token = jwt.sign({ uid: user.uid }, encodedSecret, { expiresIn: dayInSeconds, noTimestamp: true, algorithm: process.env.JWT_ALGORITHM });

        user.accessToken = token;
        user.expiresIn = dayInSeconds;

        delete user.__v
        delete user._id
        delete user.passwordHash
        delete user.salt

        return user
    } catch (error) {
        throw ApiError(error.message, error.code)
    }
}

module.exports = {
    login
}