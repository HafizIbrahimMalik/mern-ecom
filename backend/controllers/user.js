const bcrypt = require('bcrypt')   //use  "npm i --save bcrypt"  this library is for making password hash so we can hide password in our database
const User = require('../models/user')
const SellerUser = require('../models/seller')
const BuyerUser = require('../models/buyer')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.createUser = async (req, res, next) => {     //router.post to use request of posts
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(500).json({   //we can send status codes as here we are sending 500 that is server side error
      message: 'This Email is already Taken. Please try different',
      error: 'User Already Exist',
      success: false
    })
  }
  bcrypt.hash(req.body.password, 10)
    .then(async hash => {
      const session = await mongoose.startSession();
      session.startTransaction();
      const opts = { session };

      const userCollectionData = new User({
        email: req.body.email,
        password: hash,
        role: req.body.role,
      })
      userCollectionData.save(opts).then(createdUser => {   //get results after saving so we can send newly generated post id to frotnend
        let userTypeCollectionData = null
        if (req.body.role === 'buyer') {
          userTypeCollectionData = new BuyerUser({
            user: createdUser._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dob: req.body.dob ? req.body.dob : null,
          })
        } else {
          userTypeCollectionData = new SellerUser({
            user: createdUser._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dob: req.body.dob ? req.body.dob : null,
          })
        }
        userTypeCollectionData.save(opts).then(async createdUserType => {
          const token = jwt.sign({ email: createdUser.email, userId: createdUser._id },
            process.env.JWT_KEY,
            { expiresIn: '1h' })  //user first argument AS DATA WHICH NEEDED TO BE IN TOKEN And 2nd argument is secret key its just for development to make string hash
          const dataToReturn = {
            token: token,
            id: createdUser._id,
            email: createdUser.email,
            [req.body.role]: createdUserType
          }
          await session.commitTransaction();
          res.status(201).json({   //we can send status codes as here we are sending 201 that resource is addedd successfully
            message: 'User added successfully',
            data: { ...dataToReturn },
            success: true
          })
        })
          .catch(async err => {
            await session.abortTransaction();
            session.endSession();
            throw res.status(500).json({   //we can send status codes as here we are sending 500 that is server side error
              message: 'Validation Errors',
              error: err.errors,
              success: false
            })
          })
      })
        .catch(async err => {
          console.log('sadf', err);
          await session.abortTransaction();
          session.endSession();
          return res.status(500).json({   //we can send status codes as here we are sending 500 that is server side error
            message: 'Validation Errors',
            error: err.errors,
            success: false
          })
        })
    })
}


exports.userLogin = (req, res, next) => {
  let fetechedUser
  User.findOne({ email: req.body.email }).select("+password").then(user => {
    fetechedUser = user
    if (!user) {
      throw {   //we can send status codes as here we are sending 404 that is resource you are looking for is not found
        message: 'User with this email not found',
        error: 'No User Found',
        success: false
      }.catch(err => {
      })
    }
    return bcrypt.compare(req.body.password, user.password)   //as we cant dcrypt the encrypted password that we stored in database we can compare by making hash to requested pasword with database password
  })
    .then(async result => {
      if (!result) {
        throw {   //we can send status codes as here we are sending 404 that is resource you are looking for is not found
          message: 'Please make sure your credentials are correct',
          error: 'invalid Credentials',
          success: false
        }.catch(err => {
        })
      }
      const token = jwt.sign({ email: fetechedUser.email, userId: fetechedUser._id },
        process.env.JWT_KEY,
        { expiresIn: '1h' })  //user first argument AS DATA WHICH NEEDED TO BE IN TOKEN And 2nd argument is secret key its just for development to make string hash
      let userTypeData = null
      if (fetechedUser.role === 'buyer') {
        userTypeData = await BuyerUser.findOne({ email: req.body.email })
      } else {
        userTypeData = await SellerUser.findOne({ email: req.body.email })
      }
      const dataToReturn = {
        id: fetechedUser._id,
        email: fetechedUser.email,
        token: token,
        [fetechedUser.role]: userTypeData
      }
      res.status(200).json({   //we can send status codes as here we are sending 201 that resource is addedd successfully
        message: 'Signin Successfull',
        data: {
          ...dataToReturn
        },
        success: true
      })
    })
    .catch(err => {
      res.status(401).json({   //we can send status codes as here we are sending 500 that is server side error
        message: 'Something went wrong. Contact to service provider',
        error: err.errors,
        success: false
      })
    })
}
