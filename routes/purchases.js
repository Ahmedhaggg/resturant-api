const router = require('express').Router();
const purchasesController = require('../controller/purchases');
const guards = require('../middelwares/guards')
router.get('/anylisis', 
    purchasesController.anylisis
)
router.post('/:id' , 
    purchasesController.getPurchasesById
)

module.exports = router;