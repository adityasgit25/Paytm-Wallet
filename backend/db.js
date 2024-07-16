

// database file should be in the backend folder.
const mongoose = require('mongoose');
require('dotenv').config();

// this is just we are connecting to the database.
// mongoose.connect(process.env.DATABASE_URL);


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

connectDB();

// Creating the Schema
const userSchema = new mongoose.Schema({
    // remember we could have directly used username: String, but we are using the object to add more properties.(that's the superpower of mongoose)
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
        required: [true, "password is required"],
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
}, {timestamps: true});
// timestamps are passed as the second argument, which will automatically add the createdAt and updatedAt fields in the database.

const accountSchema = new mongoose.Schema({
    userId: {

        // for referencing we basically use these two properties.
        // type and ref
        type: mongoose.Schema.Types.ObjectId, // Reference to User Model
        ref: 'User',
        required: true
    }, 
    balance: {
        type: Number, 
        required: true
    }
});

// this we are creating a model, .model() takes two arguments, first is the name of the model and second is the schema.
const Account = mongoose.model('Account', accountSchema);
// User in the brackets is the name of the mongoDB collections
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Account
};

// directly we can export the model also like:
// export const Account = mongoose.model('Account', accountSchema);
// export const User = mongoose.model('User', userSchema);