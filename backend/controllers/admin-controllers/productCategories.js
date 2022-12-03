const ProductCategory = require('../../models/productCategory')

exports.CreateProductCategory = (req, res, next) => {     //router.productCategory to use request of productCategories   ii) multer(storage).single('image')   this function mean we expect single file with property name image from frontnend
    const productCategory = new ProductCategory({
        name: req.body.name,
        shortName: req.body.shortName,
        description: req.body.description,
        creator: req.userData.userId
    })
    productCategory.save().then((createdProductCategory) => {   //get results after saving so we can send newly generated productCategory id to frotnend
        res.status(201).json({   //we can send status codes as here we are sending 201 that resource is addedd successfully
            message: 'Product Category added successfully',
            data: createdProductCategory,
            success: true
        })
    }).catch(err => {
        res.status(500).json({
            message: 'There comes some issues while creating productCategory',
            success: false
        })
    })
}

exports.UpdateProductCategory = (req, res, next) => {     //router.productCategory to use request of productCategories
    const productCategory = new ProductCategory({
        _id: req.body.id,
        name: req.body.name,
        shortName: req.body.shortName,
        description: req.body.description,
        creator: req.userData.userId
    })
    ProductCategory.updateOne({ _id: req.params.id, creator: req.userData.userId }, productCategory).then((createdProductCategory) => {   //get results after saving so we can send newly generated productCategory id to frotnend
        if (createdProductCategory.matchedCount > 0) {    //its shows us if user with creted productCategory id is the user who is editing productCategory. if true it will resturn > 0 result else it will be 0 modified
            res.status(201).json({   //we can send status codes as here we are sending 201 that resource is addedd successfully
                message: 'Product Category update successfully',
                data:createdProductCategory,
                success: true
            })
        } else {
            throw {
                message: "There comes some issues while updating productCategory",
                success: false
            }
        }

    }).catch(err => {
        res.status(500).json(err)
    })
}

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

exports.DeleteProductCategory = (req, res, next) => {   //we can get this :id in req.params which is an expressJs object which will contain req.params.id in thisf case
    ProductCategory.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: 'Product Category deleted successfully',
                success: true
            })
        } else {
            res.status(401).json({
                message: "Not Authorized to delete this productCategory",
                success: false
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: "ProductCategory Deleting failed",
            success: false
        })
    })
}
