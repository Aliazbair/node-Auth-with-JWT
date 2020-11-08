const { __esModule } = require('validator/lib/isAlpha')
const User = require('../models/User')

// handel errors
const handleErrors = (err) => {
  // log the errors
  console.log(err.message, err.code)
  let errors = { email: '', password: '' }

  //   duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already registred'
    return errors
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

module.exports.signup_get = (req, res) => {
//   res.render('signup')
res.send('hi')
}

module.exports.login_get = (req, res) => {
  res.render('/user/login')
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({ email, password })
    res.status(201).json(user)
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
  } catch (error) {
    console.log(err)
    res.status(210).json({
      msg: 'error, user not created',
    })
  }
}
