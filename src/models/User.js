const mongoose = require('mongoose');
const hidden = require('mongoose-hidden')({ defaultHidden: { _id: true, __v: true } });

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

userSchema.plugin(hidden)

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;