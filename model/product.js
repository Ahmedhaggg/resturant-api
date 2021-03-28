const mongoose = require('mongoose');

const prodcutSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    category: {
        type: String,
        required: true
    },
    sizes: {
        type: [
            {
                size: String,
                price: Number
            }
        ],
        default: []
    },
    toppings: {
        type: [
            {
                topping: String,
                sizes: [
                    {
                        size: String,
                        price: Number
                    }
                ]
            }
        ]
    },
    specialsAdditions: {
        type: [
            {
                addition: String,
                sizes: [
                    {
                        size: String,
                        price: Number
                    }
                ]
            }
        ]
    },
    pieces: {
        type: [
            {
                pieces: String,
                price: Number
            }
        ]
    },
    price: Number,
    image: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('product', prodcutSchema);

module.exports = Product;