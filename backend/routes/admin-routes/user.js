const express = require('express')
const router = express.Router()
const UsersController = require("../../controllers/admin-controllers/users")
const checkAuth = require('../../middlewares/check-auth')

router.post('', checkAuth, UsersController.CreateUser)

// router.put('/:id', checkAuth, UsersController.UpdateProductCategory)

router.get('', UsersController.GetUsers)

// router.get('/:id', UsersController.GetProductCategory)

// router.delete('/:id', checkAuth, UsersController.DeleteProductCategory)

module.exports = router
