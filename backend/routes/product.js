const express = require('express')
const router = express.Router()
const ProductController = require("../controllers/product")
const checkAuth = require('../middlewares/check-auth')
const extractFile = require('../middlewares/file')

router.post('', checkAuth, extractFile, ProductController.CreateProduct)

router.put('/:id', checkAuth, extractFile, ProductController.UpdateProduct)

router.get('', ProductController.GetProducts)

router.get('/:id', ProductController.GetProduct)

router.delete('/:id', checkAuth, ProductController.DeleteProduct)

module.exports = router
