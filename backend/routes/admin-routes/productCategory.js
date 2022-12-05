const express = require('express')
const router = express.Router()
const ProductCategoriesController = require("../../controllers/admin-controllers/productCategories")
const checkAuth = require('../../middlewares/check-auth')

router.post('', checkAuth, ProductCategoriesController.CreateProductCategory)

router.put('/:id', checkAuth, ProductCategoriesController.UpdateProductCategory)

router.get('', checkAuth,  ProductCategoriesController.GetProductCategories)

router.get('/:id', checkAuth,  ProductCategoriesController.GetProductCategory)

router.delete('/:id', checkAuth, ProductCategoriesController.DeleteProductCategory)

module.exports = router
