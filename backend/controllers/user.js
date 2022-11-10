const bcrypt = require('bcrypt')   //use  "npm i --save bcrypt"  this library is for making password hash so we can hide password in our database
const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.createUser = (req, res, next) => {     //router.post to use request of posts
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        dob: req.body.dob ? req.body.dob : null,
      })
      user.save().then(createdUser => {   //get results after saving so we can send newly generated post id to frotnend
        res.status(201).json({   //we can send status codes as here we are sending 201 that resource is addedd successfully
          message: 'User added successfully',
          data: createdUser,
          success: true
        })
      })
        .catch(err => {
          res.status(500).json({   //we can send status codes as here we are sending 500 that is server side error
            message: 'This Email is already Taken. Please try different',
            error: err.errors,
            success: false
          })
        })

    })
}

exports.userLogin = (req, res, next) => {
  let fetechedUser
  User.findOne({ email: req.body.email }).then(user => {
    fetechedUser = user
    if (!user) {
      throw {   //we can send status codes as here we are sending 404 that is resource you are looking for is not found
        message: 'User with this email not found',
        error: 'No User Found',
        success: false
      }
    }
    return bcrypt.compare(req.body.password, user.password)   //as we cant dcrypt the encrypted password that we stored in database we can compare by making hash to requested pasword with database password
  })
    .then(result => {
      if (!result) {
        throw {   //we can send status codes as here we are sending 404 that is resource you are looking for is not found
          message: 'Please make sure your credentials are correct',
          error: 'invalid Credentials',
          success: false
        }
      }
      const token = jwt.sign({ email: fetechedUser.email, userId: fetechedUser._id },
        process.env.JWT_KEY,
        { expiresIn: '1h' })  //user first argument AS DATA WHICH NEEDED TO BE IN TOKEN And 2nd argument is secret key its just for development to make string hash
      res.status(200).json({   //we can send status codes as here we are sending 201 that resource is addedd successfully
        message: 'Signin Successfull',
        token: token,
        expiresIn: 3600,
        userId: fetechedUser._id,
        success: true
      })
    })
    .catch(err => {
      return res.status(401).json(err)
    })
}
