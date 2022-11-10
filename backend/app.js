const path = require('path')
const express = require('express')     //syntax to import libraries e.g require('your library)
const bodyParser = require('body-parser')    //this lib gives you extra artibute as res.body which will parse the incomming json from client side
const mongoose = require('mongoose')
const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const app = express()

mongoose.connect(`mongodb+srv://root:${process.env.MONGO_ATLAS_PW}@mean-stack.otl2mlp.mongodb.net/mean-stack?retryWrites=true&w=majority`).then(() => {
  console.log('connected to database')
})
  .catch((e) => {
    console.log('connection database failed',e)

  })

app.use(bodyParser.json())    //parse the incoming data to json
app.use(bodyParser.urlencoded({ extended: false }))  //get different type of body data
app.use("/images",express.static(path.join("backend/images")))   //any calls which have /images in it allowed to continue to fetch images from backend

app.use((req, res, next) => {   //Allows cors to send req from client side if client and backend is working on diff servers
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With,Content-Type,Accept,Authorization")
  res.setHeader('Access-Control-Allow-Methods', "GET,POST,PATCH,DELETE,OPTIONS,PUT")

  next()
})

app.use('/api/posts',postsRoutes)
app.use('/api/user',userRoutes)


module.exports = app
