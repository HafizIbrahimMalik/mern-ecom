const mongoose = require('mongoose')     //This packege use to connect to mongo db and also provides some fucntion like to make schema and models etc check official doc
const uniqueValidator = require('mongoose-unique-validator')    // npm i --save mongoose-unique-validator     =>> this library helps us to unique validator we will use for email in signup


const userSchema = mongoose.Schema({
  // firstName: { type: String, required: true },
  // lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['seller', 'buyer'], required: true },
  // dob: { type: Date, min: '1950-01-01', max: new Date() },
})
userSchema.plugin(uniqueValidator)    //mongoose have specail function called plugin() where you can plugin your more library regarding to moogose by installing them in or case it unique validator
module.exports = mongoose.model('User', userSchema)
