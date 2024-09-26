const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    usertype: { type: String, required: true }, 
}, {
    timestamps: true, // This automatically added when create or update user fields
});

module.exports = mongoose.model('Singup', userSchema);