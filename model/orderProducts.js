const mongoose = require('mongoose');
const orderProductSchema = mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    toppings: {
        type: [
            {
                topping: String,
                quantity: {
                    type: String,
                    enum: ["with", "plus"]
                }
            }
        ]
    },
    specialAdditions: {
        type: [
            {
                addition: String,
                quantity: {
                    type: String,
                    enum: ["with", "plus"]
                }
            }
        ]
    },
    size: {
        type: String
    },
    pieces: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const OrderProducts = mongoose.model('orderProduct', orderProductSchema);
module.exports = OrderProducts;