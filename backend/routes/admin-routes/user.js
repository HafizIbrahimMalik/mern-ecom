const express = require('express')
const router = express.Router()
const UsersController = require("../../controllers/admin-controllers/users")
const checkAuth = require('../../middlewares/check-auth')

router.post('', checkAuth, UsersController.CreateUser)

router.put('/:id', checkAuth, UsersController.UpdateUser)

router.get('', checkAuth,  UsersController.GetUsers)

router.get('/:id', checkAuth,  UsersController.GetUser)

router.delete('/:id', checkAuth, UsersController.DeleteUser)

module.exports = router
