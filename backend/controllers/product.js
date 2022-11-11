const Product = require('../models/product')

exports.CreateProduct = (req, res, next) => {     //router.product to use request of product   ii) multer(storage).single('image')   this function mean we expect single file with property name image from frontnend
    const url = req.protocol + '://' + req.get("host")   //this is to get address of server so we can put it in our saved image
    const product = new Product({
        name: req.body.name,
        shortName: req.body.shortName,
        description: req.body.description,
        imagePath: url + "/images/" + req.file.filename,
        productCategory: req.body.productCategoryId
    })
    product.save().then((createdProduct) => {   //get results after saving so we can send newly generated product id to frotnend
        res.status(201).json({   //we can send status codes as here we are sending 201 that resource is addedd successfully
            message: 'Product added successfully',
            data: createdProduct,
            success: true
        })
    }).catch(err => {
        console.log('error',err);
        res.status(500).json({
            message: 'There comes some issues while creating product',
            success: false
        })
    })
}

exports.UpdateProduct = (req, res, next) => {     //router.product to use request of product
    let imagePath = req.body.image
    if (req.file) {
        const url = req.protocol + '://' + req.get("host")   //this is to get address of server so we can put it in our saved image
        imagePath = url + "/images/" + req.file.filename
    }
    const product = new Product({
        _id: req.body.id,
        name: req.body.name,
        shortName: req.body.shortName,
        description: req.body.description,
        imagePath: imagePath,
        productCategory: req.body.productCategoryId
    })
    Product.updateOne({ _id: req.params.id, creator: req.userData.userId }, product).then((createdProduct) => {   //get results after saving so we can send newly generated product id to frotnend
        if (createdProduct.matchedCount > 0) {    //its shows us if user with creted product id is the user who is editing product. if true it will resturn > 0 result else it will be 0 modified
            res.status(201).json({   //we can send status codes as here we are sending 201 that resource is addedd successfully
                message: 'Product update successfully',
                data: createdProduct,
                success: true
            })
        } else {
            throw {
                message: "There comes some issues while updating product",
                success: false
            }
        }

    }).catch(err => {
        res.status(500).json(err)
    })
}

exports.GetProducts = (req, res, next) => {
    const paginationDetails = { ...req.query }
    const productQuery = Product.find()
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
    Product.findById(req.params.id).then(product => {
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

exports.DeleteProduct = (req, res, next) => {   //we can get this :id in req.params which is an expressJs object which will contain req.params.id in thisf case
    Product.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: 'Product deleted successfully',
                success: true
            })
        } else {
            res.status(401).json({
                message: "Not Authorized to delete this product",
                success: false
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: "Product Deleting failed",
            success: false
        })
    })
}
