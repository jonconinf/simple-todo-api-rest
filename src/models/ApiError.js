module.exports.ApiError = (msg = 'Internal Server Error', errorCode = 500) => {
    return {
        message: msg,
        code: errorCode
    }
}