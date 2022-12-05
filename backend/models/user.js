const mongoose = require('mongoose')     //This packege use to connect to mongo db and also provides some fucntion like to make schema and models etc check official doc
const uniqueValidator = require('mongoose-unique-validator')    // npm i --save mongoose-unique-validator     =>> this library helps us to unique validator we will use for email in signup


const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['seller', 'buyer'], required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller'},
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' },

})
userSchema.plugin(uniqueValidator)    //mongoose have specail function called plugin() where you can plugin your more library regarding to moogose by installing them in or case it unique validator
module.exports = mongoose.model('User', userSchema)