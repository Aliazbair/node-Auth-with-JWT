const mongoose = require('mongoose')

//connnect function
const connectDB = async () => {
  try {
    const con = await mongoose.connect('mongodb://localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(`MongoDb Connected: ${con.connection.host}`)
  } catch (err) {
    console.error(err)
    proccess.exit(1)
  }
}

module.exports = connectDB
