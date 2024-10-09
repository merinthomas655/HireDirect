const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  phone_number: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip_code: { type: String },
  },
  role: { type: String, enum: ['user', 'provider', 'admin'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
