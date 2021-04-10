const mongoose = require('mongoose');



const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId
            },
            quantity: {
                type: Number
            }
        }
    ],
    adress: {
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zone: {
            type: String,
            required: true
        },
        house: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "visa"],
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    receipt_url: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    recieve: {
        type: String,
        enum: ["pick up", "delivery"],
        required: true
    },
    orderTime: {
        type: Number,
        default: 30
    },
    complete: {
        type: Boolean,
        default: false
    }
})

const Order = mongoose.model("order", orderSchema)
module.exports = Order;