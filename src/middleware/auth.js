const jwt = require('jsonwebtoken');
const { validate: isValidUuid } = require('uuid');
const { ApiError } = require('../models/ApiError');
const { findUserByUid } = require('../repositories/accountRepository');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    const error = ApiError(`Invalid Authorization`, 401)

    if (!token) {
        return res.status(error.code).json(error);
    }

    try {
        const encodedSecret = btoa(process.env.JWT_SECRET)
        const decodedUuid = jwt.verify(token, encodedSecret, { algorithms: [process.env.JWT_ALGORITHM] });

        if (decodedUuid && decodedUuid.uid && !isValidUuid(decodedUuid.uid)) {
            return res.status(error.code).json(error);
        }

        const user = await findUserByUid(decodedUuid.uid)
        if (!user) {
            return res.status(error.code).json(error);
        }

        req.userUid = decodedUuid.uid;

        next();
    } catch (error) {
        return res.status(401).json(error);
    }
};

module.exports = verifyToken;