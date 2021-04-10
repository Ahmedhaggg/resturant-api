const router = require('express').Router();
const orderController = require('../controller/order')

router.get('/', orderController.getOrders)
router.post('/add', orderController.addOrder)
router.delete('/cancel', orderController.cancelOrder)
router.delete('/', orderController.deleteOrder)
module.exports = router;