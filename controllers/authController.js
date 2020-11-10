const User = require('../models/User')
const JWT = require('jsonwebtoken')
const cookie = require('cookie-parser')

// handel errors
const handleErrors = (err) => {
  // log the errors
  // console.log(err.message, err.code)
  let errors = { email: '', password: '' }

  //   duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already registred'
    return errors
  }

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registred'
  }
  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'that email is incorrect'
  }

  //   validation errors
  if (err.message.includes('user validation failed')) {
    //   console.log(err.errors);
    // loop throuth errors
    Object.values(err.errors).forEach((prop) => {
      errors[prop.path] = prop.message
    })
  }

  return errors
}

const maxAge = 3 * 24 * 60 * 60
// create token function
const createToken = (id) => {
  return JWT.sign({ id }, 'net ali secrct', {
    expiresIn: maxAge,
  })
}

module.exports.signup_get = (req, res) => {
  res.render('users/signup')
}

module.exports.login_get = (req, res) => {
  res.render('users/login')
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body

  try {
    // create new user
    const user = await User.create({ email, password })

    // create token
    const token = createToken(user._id)

    // set token to cookies
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

    res.status(201).json({
      success: true,
      user: user._id,
    })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(404).json({
      errors,
    })
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err)
   
  }
}
