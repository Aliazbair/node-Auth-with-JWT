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

// fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
  console.log('new user was created & saved ', doc)
  next()
})
// fire a function before doc saved to db
userSchema.pre('save', function (doc, next) {
  console.log('user about to be  created & saved ', doc)
  next()
})
const User = mongoose.model('User', userSchema)

module.exports = User
