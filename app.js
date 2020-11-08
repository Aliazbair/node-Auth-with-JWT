const path = require('path')
const express = require('express')
const connectDB= require('./config/db')

// init app
const app = express()
//call DB
connectDB()
// set public folder
app.use(express.static(path.join(__dirname, 'public')))

// json
app.use(express.json())

// set ejs
app.set('view engine','ejs')

// link routes
app.use('/user', require('./routers/user'))

// PORT
const PORT = process.env.PORT || 3000
// listen to server

app.listen(PORT, console.log(`server running IN PORT ${PORT}`))
