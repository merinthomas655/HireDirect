const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {type: String,required: true,unique: true},
  email: {type: String,required: true,unique: true},
  password_hash: {type: String,required: true},
  phone_number: {type: String,required: true},
  address: {type: String,required: true},
  role: {type: String,enum: ['user', 'provider', 'admin'],required: true},
  created_at: {type: Date,default: Date.now},
  updated_at: {type: Date,default: Date.now}
});

const User = mongoose.model('User', userSchema);

module.exports = User;