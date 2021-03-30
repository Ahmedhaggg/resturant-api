const Product = require('../model/product');
const slugify = require('slugify')
const validationResult = require('express-validator').validationResult;
const fs = require('fs')
let uploadsPath =  __dirname.replace("controller", "uploads") + '\\' ;

exports.getAllproducts = async (req, res, next) => {
    const query = Product.find()
    query.select("_id name category image")
    const products = await query.exec();
    products.forEach(product => {
        product.show = {
            method: "GET",
            url: process.env.URL + "api/products/" + product.id
        }
        product.image = process.env.URL+ product.image
    })
    if (products.length > 0)
        return res.status(200).json({products})
    if (!products) 
        return res.status(500).json({message: "something went wrong"});
    if (products.length == 0) 
        return res.status(200).json({message: "There are no products"});
}
exports.getProduct = async (req, res, next) => {
    const id = req.params.productId;
    console.log(id)
    const product = await Product.findById(id);
    if (!product) {
        return res.status(500).json({message: "something went wrong"})
    }
    res.status(200).json({
        id: product.id,
        name: product.name,
        category: product.category,
        image: process.env.URL + product.image,
        descripition: product.descripition,
        toppings: product.toppings,
        defaultTopping: product.defaultTopping,
        specialsAdditions: product.specialsAdditions,
        pieces: product.pieces,
        price: product.price,
        delete: {
            method: "DELETE",
            url: process.env.URL + "api/products/delete",
            body: { id: product.id }
        },
        update: {
            method: "POST",
            url: process.env.URL + "api/products/update",
            body : {
                id: product.id,
                data: "you should select it"
            }
        }
    }) 
}

const checkErr = (expectedErrors, errors) => {
    let validationErrors =  [];
    let expectedErrList = Object.keys(expectedErrors);
    expectedErrList.forEach(expectedErr => {
        let error =  errors.find(err => err.param === expectedErr);
        if (error) {
            validationErrors.push(error)
        } 
    })
    console.log(validationErrors)
    if (validationErrors.length > 0) {
        return validationErrors;
    } else {
        return false;
    } 
}

exports.addProduct = async (req, res, next) => {

    if (!req.file) {
        return res.status(400).json({message: "you should select file"});
    }
    const {name, descripition, category , sizes, toppings, defaultTopping , specialsAdditions, price} = req.body;
    let data;
    let error = validationResult(req).array();
    if (category == "pizza") {
        data = {name ,descripition, category, sizes, toppings, defaultTopping , specialsAdditions }
        let checkErrResult = checkErr(data, error);
        if(checkErrResult) {
            await fs.unlinkSync(uploadsPath + req.file.filename)
            return res.status(400).json({error: checkErrResult});
        }
    } else if (category == "drink") {
        data = {name ,descripition, category, sizes }
        let checkErrResult = checkErr(data, error);
        if(checkErrResult) {
            await fs.unlinkSync(uploadsPath + req.file.filename)
            return res.status(400).json({error: checkErrResult});
        }
    } else if (category == "salads") {
        data = {name ,descripition, category, sizes, toppings }
        let checkErrResult = checkErr(data, error);
        if(checkErrResult) {
            await fs.unlinkSync(uploadsPath + req.file.filename)
            return res.status(400).json({error: checkErrResult});
        }
    } else if (category == "starters") {
        data = {name ,descripition, category, sizes }
        let checkErrResult = checkErr(data, error);
        if(checkErrResult) {
            await fs.unlinkSync(uploadsPath + req.file.filename)
            return res.status(400).json({error: checkErrResult});
        }
    } else if (category == "pasta") {
        data = {name ,descripition, category, price }
        let checkErrResult = checkErr(data, error);
        if(checkErrResult) {
            await fs.unlinkSync(uploadsPath + req.file.filename)
            return res.status(400).json({error: checkErrResult});
        }
    } else if (category == "desert") {
        data = {name ,descripition, category, price }
        let checkErrResult = checkErr(data, error);
        if(checkErrResult) {
            await fs.unlinkSync(uploadsPath + req.file.filename)
            return res.status(400).json({error: checkErrResult});
        }
    } else {
        await fs.unlinkSync(uploadsPath + req.file.filename)
        return res.status(400).json({message : "should select correct category"})
    }
    const slug = slugify(name);
    data.slug = slug;
    data.image = req.file.filename;
    const product = new Product(data)
    try {
        const save = await product.save();
        res.status(201).json({message: "product is added successfully"})
    } catch (error) {
        await fs.unlinkSync(uploadsPath + req.file.filename)
        res.status(500).json({message: "something went wrong"})
    }
}
exports.deleteProduct = async (req, res, next) => {
    const { id } = req.body;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (deleteProduct) { 
        await fs.unlinkSync(uploadsPath + deleteProduct.image);
        return res.status(200).json({message: "product is deleted successfully"})
    }
    res.status(500).json({message: "something went wrong"});
}
exports.updateProduct = async (req, res, next) => {
    const { id , newData } = req.body;
    console.log(id);
    const update = await Product.findByIdAndUpdate(id, newData, {new: true});
    console.log(update);
    if (update) {
        return res.status(200).json({
            id: update.id,
            name: update.name,
            category: update.category,
            image: process.env.URL + update.image,
            descripition: update.descripition,
            toppings: update.toppings,
            defaultTopping: update.defaultTopping,
            specialsAdditions: update.specialsAdditions,
            pieces: update.pieces,
            price: update.price,
        })
    } 
    res.status(500).json({message: "Something went wrong"})
}
exports.updateProductImage = async (req, res, next) => {
    const image = req.file.filename;
    if (!image) {
        return res.status(400).json({message: "you should select an image"})
    }
    const id  = req.body.id; 
    await Product.findById(id, async (err, doc) => {
        if (err) {
            await fs.unlink(uploadsPath + image, err => {
                if (err) {
                    return res.status(500).json({message: "something went wrong"})
                } 
                return res.status(400).json({message: "something went wrong"})
            });
        } else {
            try {
                const update = await Product.findByIdAndUpdate(id, {image}, {new: true})
                await fs.unlinkSync(uploadsPath + product.image);
                res.status(200).json({message: "product image is updated successfully"})
            } catch (error) {
                res.status(400).json({message: "something went wrong"})
            }
        }
    });
    
}

/*
let pizza = () => {
    return {
        add = data => {

        } 
    }
} 
let drink = () => {
    return {
        add = data => {
            
        } 
    }
} 
let salads = () => {
    return {
        add = data => {
            
        } 
    }
} 
let desert = () => {
    return {
        add = data => {
            
        } 
    }
} 
let starters = () => {
    return {
        add = data => {
            
        } 
    }
} 
let pasta = () => {
    return {
        add = data => {
            
        } 
    }
} 
const product = category => {
        switch (category) {
            case "pizza":
                return pizza();
            case "drink": 
                return drink();
            case "salads":
                return salads();
            case "desert": 
                return desert();
            case "starters": 
                return starters();
            case "pasta": 
                return pasta();
        }
}

*/