const Purchases = require('../model/purchases');
const Category = require('../model/category')
exports.anylisis = async (req, res, next) => {
    let query = Purchases.find().populate(
            {
                path: "orderProducts", populate: "product"
            }
    );
    // .populate({path: "orderProducts", populate: "product"});
    let purchases = await query.exec()
    let purchasesAnylisis = new Anylisis(purchases)
    let p = await purchasesAnylisis.getCategoryPurchases()
    res.status(200).json({
        purchases: p
    })
}
class Anylisis {
    constructor (purchases) {
        this.purchases = purchases;
    }
    async getCategoryPurchases() {
        const CategoriesNames = await Category.find().select("name");
        let categoryPurchases = CategoriesNames.map(category => {
            let filterPurchases = this.purchases.filter(purchas => {
                    return purchas.orderProducts.filter(orderProduct => {
                        return orderProduct.product.category === category.name? orderProduct: null;
                    })
            })
            return {
                category: category.name,
                categoryPurchases: filterPurchases,
                length : filterPurchases.length
            }
        })
        return categoryPurchases;
    }
}
//catgeories 10