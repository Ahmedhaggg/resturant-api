const jwt = require('jsonwebtoken');

exports.isAdmin = async (req, res, next) => {
    let token = req.headers.authorization
    try {
        const verify = await jwt.verify(token, process.env.JWTSECRET);
        if (verify.role == "admin") 
            next();
        else 
            res.status(400).json({message: "you aren't admin"});
    } catch (err) {
        res.status(400).json({message: "you should sign in first"});
    }
}

exports.isUser = async (req, res, next) => {
    let token = req.headers.authorization;
    try {
        const verify = await jwt.verify(token, process.env.JWTSECRET);
        req.email = verify.email;
        req._id = verify._id;
        next();
    } catch (err) {
        res.status(400).json({message: "you should sign in first"});
    }
}