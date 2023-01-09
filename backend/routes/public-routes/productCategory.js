const express = require('express')
const router = express.Router()
const ProductCategoriesController = require("../../controllers/public-controllers/productCategories")

router.get('', ProductCategoriesController.GetProductCategories)

router.get('/:id', ProductCategoriesController.GetProductCategory)

module.exports = router
