const mongoose = require('mongoose')     //This packege use to connect to mongo db and also provides some fucntion like to make schema and models etc check official doc

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId,ref:"User",required:true },
})

module.exports = mongoose.model('Post', postSchema)
