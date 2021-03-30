const router = require('express').Router();
const { check } = require('express-validator');
const productsController = require('../controller/product')
const uploader = require('../uploader/adminuploads')
const guards = require('../middelwares/guards');
router.get('/', productsController.getAllproducts)
// router.get('/index', productsController.getProductsIndex)
router.get('/product/:productId', productsController.getProduct)
// router.get('/bestseller', productsController.getBestSeller)
// router.get('/offers', productsController.getTopRank)
router.post('/add', 
uploader.uploadProductImage,
    check("name").not().isEmpty().withMessage("name can't be empty"),
    check("category").not().isEmpty().withMessage("name can't be empty"),
    check("descripition").not().isEmpty().withMessage("name can't be empty"),
    check("sizes").not().isEmpty().withMessage("name can't be empty"),
    check("toppings").not().isEmpty().withMessage("name can't be empty"),
    check("specialsAdditions").not().isEmpty().withMessage("name can't be empty"),
    check("price").not().isEmpty().withMessage("name can't be empty"),
    check("defaultTopping").not().isEmpty().withMessage("can't add this product without default topping"),
productsController.addProduct)
router.delete('/delete', productsController.deleteProduct)
router.put('/update', productsController.updateProduct)
router.put('/image/update', uploader.uploadProductImage ,productsController.updateProductImage)

module.exports = router;