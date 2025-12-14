const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 character long'],
        },
        lastname:{
            type: String,
            minlength: [3, 'Last name must be at least 3 character long'],
        },
    },

    username:{
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Username must be at least 3 character long'],
    },

    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 3 character long'],
    },

    password:{
        type: String,
        required: true,
        select: false,
    },

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

    socketId:{
        type: String,
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model("User", userSchema);
