const router = require('express').Router()

const { __esModule } = require('validator/lib/isAlpha')
const {
  signup_get,
  login_get,
  signup_post,
  login_post,
} = require('../controllers/authController')

router.route('/sigin').get(signup_get).post(signup_post)
router.route('/login').get(login_get).post(login_post)

module.exports = router
