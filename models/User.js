const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

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
// userSchema.post('save', function (doc, next) {
//   console.log('new user was created & saved ', doc)
//   next()
// })
// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})
const User = mongoose.model('User', userSchema)

module.exports = User
