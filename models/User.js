const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'please enter the email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'please enter the password'],
    minlength: [6, 'minimum passowrd length is 6 characters'],
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
