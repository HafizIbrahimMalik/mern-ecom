const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]   //here req also have header object and we can use any word to bind headers but authorization is best here as we are doing authorization
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    req.userData = {    //We are binding this to req its easy way to bind new data to request body or requests. Anywhere we are using this auth we will get userData in req e.g req.userData
      email:decodedToken.email,userId:decodedToken.userId
    }
    next()
  } catch (err) {
    res.status(401).json({   //we can send status codes as here we are sending 404 that is resource you are looking for is not found
      message: 'Auth Failed',
      error: 'Please signin',
      success: fa
    })
  }
}
