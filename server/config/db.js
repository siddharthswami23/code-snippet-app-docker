const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log('mongodb connected');
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = ConnectDB;