#Creat node auth app

> install packages

## packages using
* express
* mongoose
* bcrypt
* cooke-paresr
* josnwebtoken
* ejs 
* validator
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
