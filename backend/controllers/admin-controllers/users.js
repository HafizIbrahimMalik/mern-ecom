const bcrypt = require('bcrypt')   //use  "npm i --save bcrypt"  this library is for making password hash so we can hide password in our database
const User = require('../../models/user')
const SellerUser = require('../../models/seller')
const BuyerUser = require('../../models/buyer')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.CreateUser = async (req, res, next) => {     //router.post to use request of posts
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
                        { expiresIn: '24h' })  //user first argument AS DATA WHICH NEEDED TO BE IN TOKEN And 2nd argument is secret key its just for development to make string hash
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

exports.GetUsers = (req, res, next) => {
    const paginationDetails = { ...req.query }
    const usersQuery = User.find().populate(['seller','buyer'])
    if (+paginationDetails.pageSize && +paginationDetails.pageIndex) {
        usersQuery
            .skip(+paginationDetails.pageSize * (+paginationDetails.pageIndex - 1))   //  (paginationDetails.pageIndex - 1) this mean to skip previous pages data
            .limit(+paginationDetails.pageSize)   //   limit means take only pageSize data of page e.g. get only 10 records
    }
    let fetchedUsers
    usersQuery.then(users => {
        fetchedUsers = users
        return User.count()
    }).then(count => {
        res.status(200).json({
            message: 'Users fetched successfully',
            data: fetchedUsers,
            maxUsers: count,
            success: true
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err,
            message: "There comes some issues while fetching users",
            success: false
        })
    })
}

