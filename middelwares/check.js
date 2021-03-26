const validationResult = require('express-validator').validationResult;

const isValid = (req, res, next) => {
    console.log(validationResult(req).array())

    if (validationResult(req).array().length > 0) {
        res.status(400).json({message: validationResult(req).array()[0]})
        return;
    }
    next()
}
module.exports = isValid;