// database file should be in the backend folder.
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://adityamah2002:database2512@cluster0.y4dtc2q.mongodb.net/paytm")


// Creating the Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3, 
    },
    password: {
        type: String, 
        required: true,
        minLength: 3
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User Model
        ref: 'User',
        required: true
    }, 
    balance: {
        type: Number, 
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
// User in the brackets is the name of the mongoDB collections
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Account
};