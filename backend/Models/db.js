const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(() => {
    console.log('Connected to MongoDB');

}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
})