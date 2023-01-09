const express = require('express')
const router = express.Router()
const ProductController = require("../../controllers/public-controllers/product")

router.get('', ProductController.GetProducts)

router.get('/:id', ProductController.GetProduct)

module.exports = router
