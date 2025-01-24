    const mongoose = require('mongoose');
    require('dotenv').config()
    mongoose.set('strictQuery', false)


    const url = process.env.MONGODB_URI

    mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

    const userSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
    });

    const User = mongoose.model('User', userSchema);
    module.exports = User;
