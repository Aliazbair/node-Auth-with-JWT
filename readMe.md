#Creat node auth app

> install packages

## packages using

- express
- mongoose
- bcrypt
- cooke-paresr
- josnwebtoken
- ejs
- validator

```js
 npm i express bcrypt mongoose cooke-parser ejs josnwebtoken validator

```

# hashed password

1. go to user model
1. make function fire after doc saved to db
1. install bycrpt package
1. use salt and hash to bycrpt password

```js
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})
```

### cretae sing Up and sing in form and get the filed values

```html
<form>
  <h2>Sign Up</h2>
  <label for="email">Email</label>
  <input type="email" name="email" id="email" />
  <div class="email error"></div>
  <label for="password">password</label>
  <input type="password" name="password" id="password" />
  <div class="password error"></div>
  <button>Sign Up</button>
</form>
```

````js
  const form = document.querySelector('form')

    // add event
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
       // get fields value
       const email=form.email.value
       const password=form.password.value

       console.log(email,password);
    })

    ```

    ### create handle errors function
    ```js
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

````

> use cookies

```js
// cookies
app.get('/set-cookies', (req, res) => {
  //   res.setHeader('Set-cookie', 'newUser=true')
  res.cookie('newUser', false)
  res.cookie('isAdmin', true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: false,
    secure: false,
  })

  res.send('you got the cookies')
})

//get cookies
app.get('/read-cookise', (req, res) => {
  const cookies = req.cookies

  console.log(cookies)
  // res.json(cookies)
  const { isAdmin } = cookies
  if (isAdmin) {
    res.send('admin')
  } else {
    res.send('not admin')
  }
})
```

# JWT Signing

> Header Tells the server what type od singature is being used(meta)

> Payload Used to identify the user (e.g contains user id)

> Signatrue Makes the token secure (like a stamp of authenticity)

## make sing up post with JWT

### create token function

```js
const maxAge = 3 * 24 * 60 * 60
// create token function
const createToken = (id) => {
  return JWT.sign({ id }, 'net ali secrct', {
    expiresIn: maxAge,
  })
}
```

# sing up user

```js
// get form
const form = document.querySelector('form')

// get email and password errors
const emailError = document.querySelector('.email.error')
const passwordError = document.querySelector('.password.error')

// add event
form.addEventListener('submit', async (e) => {
  e.preventDefault()

  // reast values
  emailError.textContent = ''
  passwordError.textContent = ''
  // get fields value
  const email = form.email.value
  const password = form.password.value
  //    send data to database
  try {
    const url = ' http://localhost:3000/user/signup'
    const res = await fetch(url, {
      method: 'POST',

      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    // get the data from res
    const data = await res.json()
    console.log(data)
    // check the errors
    if (data.errors) {
      //    set the errors
      emailError.textContent = data.errors.email
      passwordError.textContent = data.errors.password
    }
    if (data.user) {
      location.assign('/')
    }
  } catch (err) {
    console.log(err)
  }
})
```

# login action

first create the login function in User module

```js
// static method to login user
userSchema.statics.login = async function (email, password) {
  // find user
  const user = await this.findOne({ email })
  // check the user
  if (user) {
    // match password
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    // show error of password
    throw Error('incorrect password')
  }
  // show error of email
  throw Error('incorrect email')
}
```

### second use the function in auth controller

```js
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
```

### last login in forntend

```js
const form = document.querySelector('form')
// get email and password errors
const emailError = document.querySelector('.email.error')
const passwordError = document.querySelector('.password.error')

// add event
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  emailError.textContent = ''
  passwordError.textContent = ''
  // get fields value
  const email = form.email.value
  const password = form.password.value
  try {
    const url = ' http://localhost:3000/user/login'
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    //    get data
    const data = await res.json()
    console.log(data)
    if (data.errors) {
      emailError.textContent = data.errors.email
      passwordError.textContent = data.errors.password
    }
    // if user login
    if (data.user) {
      location.assign('/')
    }
  } catch (err) {
    console.log(err)
  }
})
```
