const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "there are category with this name"]
    },
    products: {
        type: [
            mongoose.Types.ObjectId,
        ],
        default: []
    }
}, { timestamps: true })

const Category = mongoose.model("categorie", categorySchema);
module.exports = Category;