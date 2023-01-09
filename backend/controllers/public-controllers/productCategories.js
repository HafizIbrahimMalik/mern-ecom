const ProductCategory = require('../../models/productCategory')


exports.GetProductCategories = (req, res, next) => {
    const paginationDetails = { ...req.query }
    const productCategoryQuery = ProductCategory.find()
    if (+paginationDetails.pageSize && +paginationDetails.pageIndex) {
        productCategoryQuery
            .skip(+paginationDetails.pageSize * (+paginationDetails.pageIndex - 1))   //  (paginationDetails.pageIndex - 1) this mean to skip previous pages data
            .limit(+paginationDetails.pageSize)   //   limit means take only pageSize data of page e.g. get only 10 records
    }
    let fetchedProductCategories
    productCategoryQuery.then(productCategories => {
        fetchedProductCategories = productCategories
        return ProductCategory.count()
    }).then(count => {
        res.status(200).json({
            message: 'Product Categories fetched successfully',
            data: fetchedProductCategories,
            maxProductCategorys: count,
            success: true
        })
    }).catch(err => {
        res.status(500).json({
            message: "There comes some issues while updating productCategory",
            success: false
        })
    })
}

exports.GetProductCategory = (req, res, next) => {
    ProductCategory.findById(req.params.id).then(productCategory => {
        if (productCategory) {
            res.status(200).json({
                message: 'ProductCategory fetched successfully',
                data: productCategory,
                success: true
            })
        } else {
            res.status(404).json({
                message: 'ProductCategory not found',
                productCategory: null,
                success: false
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "ProductCategory Fetching failed",
            success: false
        })
    })
}
