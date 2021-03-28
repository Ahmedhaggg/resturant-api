const Product = require('../model/product');
const slugify = require('slugify')
const validationResult = require('express-validator').validationResult;
const fs = require('fs')
const checkErr = (expectedErr, errors) => {
    let validationErr =  [];
    expectedErr.forEach(element => {
        validationErr =  errors.find(err => err.param === expectedErr)
    });
    if (validationErr.length > 0) {
        await fs.unlink(uploadsPath + req.file.filename, (err) => {
            if (err) {
                return validationErr;
            };
        })
        return validationErr;
    } else {
        return false;
    } 
}

exports.addProduct = async (req, res, next) => {

    if (!req.file) {
        return res.status(400).json({message: "you should select file"});
    }
    const {name, descripition, category , sizes, toppings, specialsAdditions, price} = req.body;
    let data;
    let error = validationResult(req).array();
    if (category == "pizza") {
        data = {name, slug ,descripition, category, sizes, toppings, specialsAdditions }
        let checkErrResult = checkErr(data, error);
        if(checkErrResult) {
            return res.status(400).json({error: checkErrResult});
        }
    } else if (category == "drink") {
        data = {name, slug ,descripition, category, sizes }
        let checkErrResult = checkErr(data, error);
        if(checkErrResult) {
            return res.status(400).json({error: checkErrResult});
        }
    } else if (category == "salads") {
        data = {name, slug ,descripition, category, sizes, toppings }
        let checkErrResult = checkErr(data, error);
        if(checkErrResult) {
            return res.status(400).json({error: checkErrResult});
        }
    } else if (category == "starters") {
        data = {name, slug ,descripition, category, sizes }
        let checkErrResult = checkErr(data, error);
        if(checkErrResult) {
            return res.status(400).json({error: checkErrResult});
        }
    } else if (category == "pasta") {
        data = {name, slug ,descripition, category, sizes }
        let checkErrResult = checkErr(data, error);
        if(checkErrResult) {
            return res.status(400).json({error: checkErrResult});
        }
    } else if (category == "desert") {
        data = {name, slug ,descripition, category, price }
        let checkErrResult = checkErr(data, error);
        if(checkErrResult) {
            return res.status(400).json({error: checkErrResult});
        }
    } else {
        res.status(400).json({message : "should select correct category"})
        await fs.unlink(uploadsPath + req.file.filename, (err) => {
            if (err) {
                return res.status(400).json({message: "something went wrong"});
            };
            return res.status(400).json({message: "something went wrong"});
        })
    }
    const slug = slugify(name);
    data.slug = slug;
    data.image = req.file.filename;
    const product = new Product(data)
    const save = await product.save();
    if (!save) {
        await fs.unlink(uploadsPath + req.file.filename, (err) => {
            if (err) {
                return res.status(400).json({message: "something went wrong"});
            };
            return res.status(400).json({message: "something went wrong"});
        })
        return res.status(500).json({message: "something went wrong"})
    }
    res.status(201).json({message: "product is added successfully"})
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