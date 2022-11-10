const express = require('express')
const router = express.Router()
const PostController = require("../controllers/posts")
const checkAuth = require('../middlewares/check-auth')
const extractFile = require('../middlewares/file')

router.post('', checkAuth, extractFile, PostController.CreatePost)

router.put('/:id', checkAuth, extractFile , PostController.UpdatePost)

router.get('', PostController.GetPosts)

router.get('/:id', PostController.GetPost)

router.delete('/:id', checkAuth, PostController.DeletePost)

module.exports = router
