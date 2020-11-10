const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')

// init app
const app = express()

// middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cookieParser())

//call DB
connectDB()
// set public folder
app.use(express.static(path.join(__dirname, 'public')))

// set ejs
app.set('view engine', 'ejs')

// link routes
app.get('/',(req,res)=>{
    res.render('smoothies')
})
app.use('/user', require('./routers/user')) 

// PORT
const PORT = process.env.PORT || 3000
// listen to server

app.listen(PORT, console.log(`server running IN PORT ${PORT}`))
