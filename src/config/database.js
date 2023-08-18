const mongoose = require('mongoose');

const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_PORT = process.env.DB_PORT

const init = async () => {
    try {
        await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Running');
    } catch (error) {
        const errorString = 'Error connecting to MongoDB: ' + error.toString();
        throw new Error(errorString);
    }
};


module.exports = {
    init
}