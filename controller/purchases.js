const Purchases = require('../model/purchases');

exports.anylisis = async (req, res, next) => {
    let query = Purchases.find().populate({
        path: "orderProducts", populate: "product"
    });
    // .populate({path: "orderProducts", populate: "product"});
    let purchases = await query.exec()
    res.status(200).json({
        purchases
    })
}
class Anylisis {
    constructor (purchases) {
        this.purchases = purchases;
    }
    getCategoryPurchases() {
        let categoryPurchases = this.purchases.map(purchase => {

        })
    }
}