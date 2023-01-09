const Product = require('../../models/product')

exports.GetProducts = (req, res, next) => {
    const paginationDetails = { ...req.query }
    const productQuery = Product.find().populate('productCategory')
    if (+paginationDetails.pageSize && +paginationDetails.pageIndex) {
        productQuery
            .skip(+paginationDetails.pageSize * (+paginationDetails.pageIndex - 1))   //  (paginationDetails.pageIndex - 1) this mean to skip previous pages data
            .limit(+paginationDetails.pageSize)   //   limit means take only pageSize data of page e.g. get only 10 records
    }
    let fetchedProducts
    productQuery.then(product => {
        fetchedProducts = product
        return Product.count()
    }).then(count => {
        res.status(200).json({
            message: 'Product fetched successfully',
            data: fetchedProducts,
            maxProducts: count,
            success: true
        })
    }).catch(err => {
        res.status(500).json({
            message: "There comes some issues while updating product",
            success: false
        })
    })
}

exports.GetProduct = (req, res, next) => {
    Product.findById(req.params.id).populate('productCategory').then(product => {
        if (product) {
            res.status(200).json({
                message: 'Product fetched successfully',
                data: product,
                success: true
            })
        } else {
            res.status(404).json({
                message: 'Product not found',
                product: null,
                success: false
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Product Fetching failed",
            success: false
        })
    })
}
