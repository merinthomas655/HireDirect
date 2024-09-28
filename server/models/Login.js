const mongoose = require('mongoose');
const { SINGUP_TABLE_NAME } = require('../constants/constants');


const LoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    usertype: { type: String, required: true },
    password: { type: String, required: true },

}, { collection: SINGUP_TABLE_NAME });


module.exports = mongoose.model('Login', LoginSchema);;
