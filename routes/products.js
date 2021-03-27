const router = require('express').Router();
const productsController = require('../controller/product')
router.get('/', productsController.getAllproducts)
router.get('/index', productsController.getProductsIndex)
router.get('/:productname', productsController.getProduct)
router.get('/bestseller', productsController.getBestSeller)
router.get('/toprated', productsController.getTopRank)
router.post('/add', )

module.exports = router;